param(
    [Parameter(Mandatory=$false)]
    [string]$OutputFile = '.\inject.txt',

    [Parameter(Mandatory=$false)]
    [ValidateSet("sha256", "sha384", "sha512")]
    [string]$HashAlgorithm = "sha384"
)

# Function to get the latest commit hash using git command
function Get-LatestCommitHash {
    try {
        $latestHash = git rev-parse --short=7 HEAD
        if ($LASTEXITCODE -ne 0) {
            throw "Git command failed"
        }
        return $latestHash
    }
    catch {
        Write-Error "Error fetching latest commit hash: $_"
        exit 1
    }
}

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

# Get the latest commit hash
$latestHash = Get-LatestCommitHash

# Construct the CDN URL
$repoUrl = "https://github.com/reamkf/nanoda-wiki"
$cdnUrl = $repoUrl -replace "https://github.com/", "https://cdn.jsdelivr.net/gh/"
$cdnUrl = $cdnUrl -replace "/$", ""
$cdnUrl += "@$latestHash/nanoda-wiki.js"

# Calculate SRI hash
$sriHash = Get-SRIHash -Url $cdnUrl -Algorithm $HashAlgorithm

# Generate script tag
$scriptTag = @"
<meta name="google-site-verification" content="q6H0qChDSXhbyT2OZJ2OMDZ_3VWAkE8Ccd-BRjHEEgU" /><script src="$cdnUrl" integrity="$sriHash" crossorigin="anonymous"></script>
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