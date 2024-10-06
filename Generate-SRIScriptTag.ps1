param(
    [Parameter(Mandatory=$true)]
    [string]$ScriptUrl,

    [Parameter(Mandatory=$false)]
    [string]$OutputFile = '.\inject.txt',

    [Parameter(Mandatory=$false)]
    [ValidateSet("sha256", "sha384", "sha512")]
    [string]$HashAlgorithm = "sha384"
)

# Function to calculate SRI hash
function Get-SRIHash {
    param (
        [string]$Url,
        [string]$Algorithm
    )

    try {
        $webClient = New-Object System.Net.WebClient
        $scriptContent = $webClient.DownloadString($Url)
        $scriptBytes = [System.Text.Encoding]::UTF8.GetBytes($scriptContent)

        $hashAlg = [System.Security.Cryptography.HashAlgorithm]::Create($Algorithm)
        $hashBytes = $hashAlg.ComputeHash($scriptBytes)
        $hashString = [Convert]::ToBase64String($hashBytes)

        return "$Algorithm-$hashString"
    }
    catch {
        Write-Error "Error calculating hash: $_"
        exit 1
    }
}

# Calculate SRI hash
$sriHash = Get-SRIHash -Url $ScriptUrl -Algorithm $HashAlgorithm

# Generate script tag
$scriptTag = @"
<meta name="google-site-verification" content="q6H0qChDSXhbyT2OZJ2OMDZ_3VWAkE8Ccd-BRjHEEgU" /><script src="$ScriptUrl" integrity="$sriHash" crossorigin="anonymous"></script>>
"@

# Write to output file
try {
    $scriptTag | Out-File -FilePath $OutputFile -Encoding UTF8
    Write-Host "Script tag with SRI hash has been written to $OutputFile"
}
catch {
    Write-Error "Error writing to file: $_"
    exit 1
}