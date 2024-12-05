// @ https://cdn.jsdelivr.net/gh/reamkf/nanoda-wiki@0.1.1/nanoda-wiki.js

(() => {
	async function main(){
		const isMobile = checkIsMobile();

		if(isMobile) main_mobile();
		else main_pc();

		window.addEventListener('DOMContentLoaded', () => {
			applyTableSorter();
		});
	}
	main();

	async function main_pc(){
	}

	function main_mobile(){
		addValOnMobile();
		removeEmptyLineOnMobile();

		window.addEventListener('DOMContentLoaded', () => {
			enhanceMobileSearchFunctionality();
		});
	}

	function checkIsMobile() {
		// viewportメタタグの存在をチェック
		var hasViewportMeta = document.querySelector('meta[name="viewport"]') !== null;

		// alternateリンクの存在をチェック
		var hasAlternateLink = document.querySelector('link[rel="alternate"][media="only screen and (max-width: 640px)"]') !== null;

		// モバイル版の判定
		if (hasViewportMeta && !hasAlternateLink) {
			return true; // モバイル版
		} else if (!hasViewportMeta && hasAlternateLink) {
			return false; // PC版
		} else {
			// どちらの条件も満たさない場合は、画面幅で判断
			return window.innerWidth <= 640;
		}
	}


	function encodeEUCJP(str) {
		const eucjpArray = Encoding.convert(Encoding.stringToCode(str), 'EUCJP', 'UNICODE');
		return eucjpArray.map(byte => '%' + byte.toString(16).padStart(2, '0')).join('');
	}

	async function loadEncodingJS() {
		try {
			await loadScript(
				'https://cdnjs.cloudflare.com/ajax/libs/encoding-japanese/2.2.0/encoding.min.js',
				{ integrity: 'sha512-CArsvKzWkJZ/SAmlxryxX1vinz8JpD6RqJJqVeD2MoP8kRuwh2hEzMQSl6OMoy0DkYiqW6VMWzqP/4cWoZgTDA==' }
			);
		} catch (error) {
			console.error('Failed to load Encoding.js:', error);
		}
	}

	function addValOnMobile(){
		/* モバイル版 ヘッダロゴに[バル]を重ねる */
		addCSS(`
			div.logo > a:after {
				content: "";
				background-image: url(https://image02.seesaawiki.jp/k/h/kemono_friends3_5ch/LS9X7_9tnh.png);
				background-repeat: no-repeat;

				display: inline-block;
				pointer-events: none;
				width: 30px;
				height: 19px;
				background-size: contain;

				position: absolute;
				top: 22px;
				left: 50vw;
				z-index: 99999;
			}
		`);
	}

	function removeEmptyLineOnMobile(){
		/* 画像~~テキストで生じる余分な空行を削除 */
		addCSS(`
			.user-area figure + br {
				display: none;
			}

			.user-area figure:not(:last-child)::after {
				content: '';
				display: block;
				height: 3px;
			}
		`);
	}

	const nonEscapedCharSet = new Set(" 　!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~…†‡‰‘’“”§¨°±´¶×÷ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωЁАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэюяё‐―‘’“”†‡‥…‰′″※~℃№℡ÅⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅰⅱⅲⅳⅴⅵⅶⅷⅸⅹ←↑→↓⇒⇔∀∂∃∇∈∋∑－√∝∞∟∠∥∧∨∩∪∫∬∮∴∵∽≒≠≡≦≧≪≫⊂⊃⊆⊇⊥⊿⌒①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳─━│┃┌┏┐┓└┗┘┛├┝┠┣┤┥┨┫┬┯┰┳┴┷┸┻┼┿╂╋■□▲△▼▽◆◇○◎●◯★☆♀♂♪♭♯、。〃々〆〇〈〉《》「」『』【】〒〓〔〕～〝〟ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん゛゜ゝゞァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ・ーヽヾ㈱㈲㈹㊤㊥㊦㊧㊨㌃㌍㌔㌘㌢㌣㌦㌧㌫㌶㌻㍉㍊㍍㍑㍗㍻㍼㍽㍾㎎㎏㎜㎝㎞㎡㏄㏍一丁七万丈三上下不与丐丑且丕世丗丘丙丞両並丨个中丱串丶丸丹主丼丿乂乃久之乍乎乏乕乖乗乘乙九乞也乢乱乳乾亀亂亅了予争亊事二于云互五井亘亙些亜亞亟亠亡亢交亥亦亨享京亭亮亰亳亶人什仁仂仄仆仇今介仍从仏仔仕他仗付仙仝仞仟仡代令以仭仮仰仲件价任仼伀企伃伉伊伍伎伏伐休会伜伝伯估伴伶伸伹伺似伽佃但佇位低住佐佑体何佖佗余佚佛作佝佞佩佯佰佳併佶佻佼使侃來侈侊例侍侏侑侒侔侖侘侚供依侠価侫侭侮侯侵侶便係促俄俉俊俍俎俐俑俔俗俘俚俛保俟信俣俤俥修俯俳俵俶俸俺俾俿倅倆倉個倍倏們倒倔倖候倚倞借倡倢倣値倥倦倨倩倪倫倬倭倶倹偀偂偃偆假偈偉偏偐偕偖做停健偬偰偲側偵偶偸偽傀傅傍傑傔傘備傚催傭傲傳傴債傷傾僂僅僉僊働像僑僕僖僘僚僞僣僥僧僭僮僴僵價僻儀儁儂億儉儒儔儕儖儘儚償儡優儲儷儺儻儼儿兀允元兄充兆兇先光兊克兌免兎児兒兔党兜兢兤入全兩兪八公六兮共兵其具典兼冀冂内円冉冊册再冏冐冑冒冓冕冖冗写冝冠冢冤冥冦冨冩冪冫冬冰冱冲决冴况冶冷冽冾凄凅准凉凋凌凍凖凛凜凝几凡処凧凩凪凬凭凰凱凵凶凸凹出函凾刀刃刄分切刈刊刋刎刑刔刕列初判別刧利刪刮到刳制刷券刹刺刻剃剄則削剋剌前剏剔剖剛剞剣剤剥剩剪副剰剱割剳剴創剽剿劃劇劈劉劍劑劒劔力劜功加劣劦助努劫劬劭劯励労劵効劼劾勀勁勃勅勇勉勍勒動勗勘務勛勝勞募勠勢勣勤勦勧勲勳勵勸勹勺勾勿匀匁匂包匆匇匈匍匏匐匕化北匙匚匝匠匡匣匤匪匯匱匳匸匹区医匿區十千卅卆升午卉半卍卑卒卓協南単博卜卞占卦卩卮卯印危卲即却卵卷卸卻卿厂厄厓厖厘厚原厠厥厦厨厩厭厮厰厲厳厶去参參又叉及友双反収叔取受叙叛叝叟叡叢口古句叨叩只叫召叭叮可台叱史右叶号司叺吁吃各合吉吊吋同名后吏吐向君吝吟吠否吩含听吭吮吶吸吹吻吼吽吾呀呂呆呈呉告呎呑呟周呪呰呱味呵呶呷呻呼命咀咄咆咊咋和咎咏咐咒咜咢咤咥咨咩咫咬咯咲咳咸咼咽咾哀品哂哄哇哈哉哘員哢哥哦哨哩哭哮哲哺哽哿唄唆唇唏唐唔唖售唯唱唳唸唹唾啀啄啅商啌問啓啖啗啜啝啣啻啼啾喀喃善喆喇喉喊喋喘喙喚喜喝喞喟喧喨喩喪喫喬單喰営嗄嗅嗇嗔嗚嗜嗟嗣嗤嗷嗹嗽嗾嘆嘉嘔嘖嘗嘘嘛嘩嘯嘱嘲嘴嘶嘸噂噌噎噐噛噤器噪噫噬噴噸噺嚀嚆嚇嚊嚏嚔嚠嚢嚥嚮嚴嚶嚼囀囁囂囃囈囎囑囓囗囘囚四回因団囮困囲図囹固国囿圀圃圄圈圉國圍圏園圓圖團圜土圦圧在圭地圷圸圻址坂均坊坎坏坐坑坙坡坤坥坦坩坪坿垂垈垉型垓垠垢垣垤垪垬垰垳埀埃埆埇埈埋城埒埓埔埖埜域埠埣埴執培基埼堀堂堅堆堊堋堕堙堝堡堤堪堯堰報場堵堺堽塀塁塊塋塑塒塔塗塘塙塚塞塢塩填塰塲塵塹塾境墅墓増墜增墟墨墫墮墲墳墸墹墺墻墾壁壅壇壊壌壑壓壕壗壘壙壜壞壟壤壥士壬壮壯声壱売壷壹壺壻壼壽夂変夊夋夏夐夕外夘夙多夛夜夢夥大天太夫夬夭央失夲夷夸夾奄奇奈奉奎奏奐契奓奔奕套奘奚奛奝奠奢奣奥奧奨奩奪奬奮女奴奸好妁如妃妄妊妍妓妖妙妛妝妣妤妥妨妬妲妹妺妻妾姆姉始姐姑姓委姙姚姜姥姦姨姪姫姶姻姿威娃娉娑娘娚娜娟娠娥娩娯娵娶娼婀婁婆婉婚婢婦婪婬婿媒媚媛媼媽媾嫁嫂嫉嫋嫌嫐嫖嫗嫡嫣嫦嫩嫺嫻嬉嬋嬌嬖嬢嬪嬬嬰嬲嬶嬾孀孃孅子孑孔孕孖字存孚孛孜孝孟季孤孥学孩孫孰孱孳孵學孺宀它宅宇守安宋完宍宏宕宗官宙定宛宜宝実客宣室宥宦宮宰害宴宵家宸容宿寀寂寃寄寅密寇寉富寐寒寓寔寘寛寝寞察寡寢寤寥實寧寨審寫寬寮寰寳寵寶寸寺対寿封専射尅将將專尉尊尋對導小少尓尖尚尞尠尢尤尨尭就尸尹尺尻尼尽尾尿局屁居屆屈届屋屍屎屏屐屑屓展属屠屡層履屬屮屯山屶屹岌岐岑岔岡岦岨岩岫岬岱岳岶岷岸岺岻岼岾峅峇峙峠峡峨峩峪峭峯峰峵島峺峻峽崇崋崎崑崔崕崖崗崘崙崚崛崟崢崧崩嵂嵋嵌嵎嵐嵒嵓嵜嵩嵬嵭嵯嵳嵶嶂嶄嶇嶋嶌嶐嶝嶢嶬嶮嶷嶸嶹嶺嶼嶽巉巌巍巐巒巓巖巛川州巡巣工左巧巨巫差己已巳巴巵巷巻巽巾市布帆帋希帑帖帙帚帛帝帥師席帯帰帳帶帷常帽幀幃幄幅幇幌幎幔幕幗幟幡幢幣幤干平年幵并幸幹幺幻幼幽幾广庁広庄庇床序底庖店庚府庠度座庫庭庵庶康庸廁廂廃廈廉廊廏廐廓廖廚廛廝廟廠廡廢廣廨廩廬廰廱廳廴延廷廸建廻廼廾廿弁弃弄弉弊弋弌弍式弐弑弓弔引弖弗弘弛弟弡弥弦弧弩弭弯弱弴張強弸弼弾彁彅彈彊彌彎彑当彖彗彙彜彝彡形彦彧彩彪彫彬彭彰影彳彷役彼彿往征徂徃径待徇很徊律後徐徑徒従得徘徙從徠御徨復循徭微徳徴德徹徼徽心必忌忍忖志忘忙応忝忞忠忤快忰忱念忸忻忽忿怎怏怐怒怕怖怙怛怜思怠怡急怦性怨怩怪怫怯怱怺恁恂恃恆恊恋恍恐恒恕恙恚恝恟恠恢恣恤恥恨恩恪恫恬恭息恰恵恷悁悃悄悅悉悊悋悌悍悒悔悖悗悚悛悟悠患悦悧悩悪悲悳悴悵悶悸悼悽情惆惇惑惓惕惘惚惜惞惟惠惡惣惧惨惰惱惲想惴惶惷惹惺惻愀愁愃愆愈愉愍愎意愑愕愚愛感愠愡愧愨愬愰愴愷愼愽愾愿慂慄慇慈慊態慌慍慎慓慕慘慙慚慝慟慢慣慥慧慨慫慮慯慰慱慳慴慵慶慷慾憂憇憊憎憐憑憔憖憘憙憚憤憧憩憫憬憮憲憶憺憾懃懆懇懈應懊懋懌懍懐懣懦懲懴懶懷懸懺懼懽懾懿戀戈戉戊戌戍戎成我戒戓戔或戚戛戝戞戟戡戦截戮戯戰戲戳戴戸戻房所扁扇扈扉手才扎打払托扛扞扠扣扨扮扱扶批扼找承技抂抃抄抉把抑抒抓抔投抖抗折抛抜択抦披抬抱抵抹抻押抽拂担拆拇拈拉拊拌拍拏拐拑拒拓拔拗拘拙招拜拝拠拡括拭拮拯拱拳拵拶拷拾拿持挂指挈按挌挑挙挟挧挨挫振挺挽挾挿捉捌捍捏捐捕捗捜捧捨捩捫据捲捶捷捺捻掀掃授掉掌掎掏排掖掘掛掟掠採探掣接控推掩措掫掬掲掴掵掻掾揀揃揄揆揉描提插揖揚換握揣揩揮援揵揶揺搆損搏搓搖搗搜搦搨搬搭搴搶携搾摂摎摘摠摧摩摯摶摸摺撃撈撒撓撕撚撝撞撤撥撩撫播撮撰撲撹撻撼擁擂擅擇操擎擒擔擘據擠擡擢擣擦擧擬擯擱擲擴擶擺擽擾攀攅攘攜攝攣攤攪攫攬支攴攵收攷攸改攻放政故效敍敎敏救敕敖敗敘教敝敞敢散敦敬数敲整敵敷數斂斃文斈斉斌斎斐斑斗料斛斜斟斡斤斥斧斫斬断斯新斷方於施旁旃旄旅旆旋旌族旒旗旙旛无旡既日旦旧旨早旬旭旱旺旻昀昂昃昆昇昉昊昌明昏易昔昕昜昞星映昤春昧昨昭昮是昱昴昵昶昻昼昿晁時晃晄晉晋晏晒晗晙晝晞晟晢晤晥晦晧晨晩普景晰晳晴晶智暁暃暄暇暈暉暎暑暖暗暘暙暝暠暢暦暫暮暲暴暸暹暼暾暿曁曄曇曉曖曙曚曜曝曠曦曩曰曲曳更曵曷書曹曺曻曼曽曾替最會月有朋服朎朏朔朕朖朗望朝朞期朦朧木未末本札朮朱朴朶朷朸机朽朿杁杆杉李杏材村杓杖杙杜杞束杠条杢杣杤来杦杪杭杯杰東杲杳杵杷杼松板枅枇枉枋枌析枕林枚果枝枠枡枢枦枩枯枳枴架枷枸枹枻柀柁柄柆柊柎柏某柑染柔柘柚柝柞柢柤柧柩柬柮柯柱柳柴柵査柾柿栁栂栃栄栓栖栗栞校栢栩株栫栲栴核根格栽桀桁桂桃桄框案桍桎桐桑桒桓桔桙桜桝桟档桧桴桶桷桾桿梁梃梅梍梏梓梔梗梛條梟梠梢梦梧梨梭梯械梱梳梵梶梹梺梼棄棆棈棉棊棋棍棏棒棔棕棗棘棚棟棠棡棣棧森棯棲棹棺椀椁椄椅椈椋椌植椎椏椒椙椚椛検椡椢椣椥椦椨椪椰椴椶椹椽椿楊楓楔楕楙楚楜楝楞楠楡楢楨楪楫業楮楯楳楴極楷楸楹楼楽楾榁概榊榎榑榔榕榘榛榜榠榧榮榱榲榴榻榾榿槁槃槇槊構槌槍槎槐槓様槙槝槞槢槧槨槫槭槲槹槻槽槿樂樅樊樋樌樒樓樔樗標樛樞樟模樢樣権横樫樮樰樵樶樸樹樺樽橄橆橇橈橋橘橙機橡橢橦橫橲橳橸橾橿檀檄檍檎檐檗檜檠檢檣檪檬檮檳檸檻櫁櫂櫃櫑櫓櫚櫛櫞櫟櫢櫤櫨櫪櫺櫻欄欅權欒欖欝欟欠次欣欧欲欷欸欹欺欽款歃歇歉歌歎歐歓歔歙歛歟歡止正此武歩歪歯歳歴歸歹死歿殀殃殄殆殉殊残殍殕殖殘殞殤殪殫殯殱殲殳殴段殷殺殻殼殿毀毅毆毋母毎毒毓比毖毘毛毟毫毬毯毳氈氏民氓气気氛氣氤水氷永氾氿汀汁求汎汐汕汗汚汜汝汞江池汢汨汪汯汰汲汳決汽汾沁沂沃沆沈沌沍沐沒沓沖沙沚沛没沢沫沮沱河沸油沺治沼沽沾沿況泄泅泉泊泌泓法泗泙泚泛泝泡波泣泥注泪泯泰泱泳洄洋洌洒洗洙洛洞洟津洩洪洫洲洳洵洶洸活洽派流浄浅浙浚浜浣浤浦浩浪浬浮浯浴海浸浹涅涇消涌涎涓涕涖涙涛涜涬涯液涵涸涼淀淅淆淇淋淌淏淑淒淕淘淙淞淡淤淦淨淪淫淬淮深淲淳淵混淸淹淺添淼清渇済渉渊渋渓渕渙渚減渝渟渠渡渣渤渥渦渧温渫測渭渮港游渹渺渼渾湃湊湍湎湖湘湛湜湟湧湫湮湯湲湶湾湿満溂溌溏源準溘溜溝溟溢溥溪溯溲溶溷溺溽溿滂滄滅滉滋滌滑滓滔滕滝滞滬滯滲滴滷滸滾滿漁漂漆漉漏漑漓演漕漠漢漣漫漬漱漲漸漾漿潁潅潔潘潛潜潟潤潦潭潮潯潰潴潸潺潼澀澁澂澄澆澈澎澑澗澡澣澤澪澱澳澵澹激濁濂濃濆濔濕濘濛濟濠濡濤濫濬濮濯濱濳濵濶濺濾瀁瀅瀇瀉瀋瀏瀑瀕瀘瀚瀛瀝瀞瀟瀦瀧瀨瀬瀰瀲瀾灌灑灘灣火灯灰灸灼災炅炉炊炎炒炙炫炬炭炮炯炳炸点為炻烈烋烏烙烝烟烱烹烽焄焉焏焔焙焚焜無焦然焼煆煇煉煌煎煕煖煙煜煢煤煥煦照煩煬煮煽熄熈熊熏熔熕熙熟熨熬熱熹熾燁燃燈燉燎燐燒燔燕燗營燠燥燦燧燬燭燮燵燹燻燼燾燿爆爍爐爛爨爪爬爭爰爲爵父爺爻爼爽爾爿牀牆片版牋牌牒牘牙牛牝牟牡牢牧物牲牴特牽牾犀犁犂犇犒犖犠犢犧犬犯犱犲状犹犾狂狃狄狆狎狐狒狗狙狛狠狡狢狩独狭狷狸狹狼狽猊猖猗猛猜猝猟猤猥猩猪猫献猯猴猶猷猾猿獄獅獎獏獗獣獨獪獰獲獵獷獸獺獻玄率玉王玖玩玲玳玻玽珀珂珈珉珊珍珎珒珖珞珠珣珥珪班珮珱珵珸現球琅理琇琉琢琥琦琩琪琮琲琳琴琵琶琺琿瑁瑕瑙瑚瑛瑜瑞瑟瑠瑢瑣瑤瑩瑪瑯瑰瑳瑶瑾璃璉璋璞璟璢璧環璽瓊瓏瓔瓜瓠瓢瓣瓦瓧瓩瓮瓰瓱瓲瓶瓷瓸甁甃甄甅甌甍甎甑甓甕甘甚甜甞生産甥甦用甫甬甯田由甲申男甸町画甼畄畆畉畊畋界畍畏畑畔留畚畛畜畝畠畢畤略畦畧畩番畫畭畯異畳畴當畷畸畿疂疆疇疉疊疋疎疏疑疔疚疝疣疥疫疱疲疳疵疸疹疼疽疾痂痃病症痊痍痒痔痕痘痙痛痞痢痣痩痰痲痳痴痺痼痾痿瘁瘉瘋瘍瘟瘠瘡瘢瘤瘧瘰瘴瘻療癆癇癈癌癒癖癘癜癡癢癧癨癩癪癬癰癲癶癸発登發白百皀皂皃的皆皇皈皋皎皐皓皖皙皚皛皜皞皦皮皰皴皷皸皹皺皿盂盃盆盈益盍盒盖盗盛盜盞盟盡監盤盥盧盪目盲直相盻盾省眄眇眈眉看県眛眞真眠眤眥眦眩眷眸眺眼着睆睇睚睛睡督睥睦睨睫睹睾睿瞋瞎瞑瞞瞠瞥瞬瞭瞰瞳瞶瞹瞻瞼瞽瞿矇矍矗矚矛矜矢矣知矧矩短矮矯石矼砂砌砒研砕砠砡砥砦砧砲破砺砿硅硎硝硤硫硬硯硲硴硺硼碁碆碇碌碍碎碑碓碕碗碚碣碧碩碪碯碵確碼碾磁磅磆磊磋磐磑磔磚磧磨磬磯磴磽礁礇礎礑礒礙礦礪礫礬礰示礼社祀祁祇祈祉祐祓祕祖祗祚祝神祟祠祢祥票祭祷祺祿禀禁禄禅禊禍禎福禔禛禝禦禧禪禮禰禳禹禺禽禾禿秀私秉秋科秒秕秘租秡秣秤秦秧秩秬称移稀稈程稍税稔稗稘稙稚稜稟稠種稱稲稷稻稼稽稾稿穀穂穃穆穉積穎穏穐穗穡穢穣穩穫穰穴究穹空穽穿突窃窄窈窒窓窕窖窗窘窟窩窪窮窯窰窶窺窿竃竄竅竇竈竊立竍竏竑竒竓竕站竚竜竝竟章竡竢竣童竦竧竪竫竭端竰競竸竹竺竿笂笄笆笈笊笋笏笑笘笙笛笞笠笥符笨第笳笵笶笹筅筆筈等筋筌筍筏筐筑筒答策筝筥筧筬筮筰筱筴筵筺箆箇箋箍箏箒箔箕算箘箙箚箜箝箞箟管箪箭箱箴箸節篁範篆篇築篋篌篏篝篠篤篥篦篩篭篳篶篷簀簇簍簑簒簓簔簗簟簡簣簧簪簫簷簸簽簾簿籀籃籌籍籏籐籔籖籘籟籠籤籥籬米籵籾粁粂粃粉粋粍粐粒粕粗粘粛粟粡粢粤粥粧粨粫粭粮粱粲粳粹粽精糀糂糅糊糎糒糖糘糜糞糟糠糢糧糯糲糴糶糸糺系糾紀紂約紅紆紊紋納紐純紕紗紘紙級紛紜素紡索紫紬紮累細紲紳紵紹紺紿終絃組絅絆絈絋経絎絏結絖絛絜絞絡絢絣給絨絮統絲絳絵絶絹絽綉綏經継続綛綜綟綠綢綣綫綬維綮綯綰綱網綴綵綷綸綺綻綽綾綿緇緊緋総緑緒緕緖緘線緜緝緞締緡緤編緩緬緯緲練緻縁縄縅縉縊縋縒縛縞縟縡縢縣縦縫縮縱縲縵縷縹縺縻總績繁繃繆繊繋繍繒織繕繖繙繚繝繞繦繧繩繪繭繰繹繻繼繽繿纂纃纈纉纊續纎纏纐纒纓纔纖纛纜缶缸缺罅罇罌罍罎罐网罔罕罘罟罠罧罨罩罪罫置罰署罵罷罸罹羂羃羅羆羇羈羊羌美羔羚羝羞羡羣群羨義羮羯羲羶羸羹羽翁翅翆翊翌習翔翕翠翡翦翩翫翰翳翹翻翼耀老考耄者耆耋而耐耒耕耗耘耙耜耡耨耳耶耻耽耿聆聊聒聖聘聚聞聟聡聢聨聯聰聲聳聴聶職聹聽聾聿肄肅肆肇肉肋肌肓肖肘肚肛肝股肢肥肩肪肬肭肯肱育肴肺胃胄胆背胎胖胙胚胛胝胞胡胤胥胯胱胴胸胼能脂脅脆脇脈脉脊脚脛脣脩脯脱脳脹脾腆腋腎腐腑腓腔腕腟腥腦腫腮腰腱腴腸腹腺腿膀膂膃膈膊膏膓膕膚膜膝膠膣膤膨膩膰膳膵膸膺膽膾膿臀臂臆臈臉臍臑臓臘臙臚臟臠臣臥臧臨自臭至致臺臻臼臾舁舂舅與興舉舊舌舍舎舐舒舖舗舘舛舜舞舟舩航舫般舮舳舵舶舷舸船艀艇艘艙艚艝艟艢艤艦艨艪艫艮良艱色艶艷艸艾芋芍芒芙芝芟芥芦芫芬芭芯花芳芸芹芻芽苅苑苒苓苔苗苙苛苜苞苟苡苣若苦苧苫英苳苴苹苺苻茁茂范茄茅茆茉茎茖茗茘茜茣茨茫茯茱茲茴茵茶茸茹荀荅草荊荏荐荒荘荢荳荵荷荻荼荿莅莇莉莊莎莓莖莚莞莟莠莢莨莪莫莱莵莽菁菅菇菊菌菎菓菖菘菜菟菠菩菫華菰菱菲菴菶菷菻菽萃萄萇萋萌萍萎萓萠萢萩萪萬萱萵萸萼落葆葈葉葎著葛葡葢董葦葩葫葬葭葮葯葱葵葷葹葺蒂蒄蒋蒐蒔蒙蒜蒟蒡蒭蒲蒴蒸蒹蒻蒼蒿蓁蓄蓆蓉蓊蓋蓍蓐蓑蓖蓙蓚蓜蓬蓮蓴蓼蓿蔀蔆蔑蔓蔔蔕蔗蔘蔚蔟蔡蔦蔬蔭蔵蔽蕀蕁蕃蕈蕉蕊蕋蕎蕓蕕蕗蕘蕙蕚蕣蕨蕩蕪蕫蕭蕷蕾薀薄薇薈薊薐薑薔薗薙薛薜薤薦薨薩薪薫薬薮薯薰薹薺藁藉藍藏藐藕藜藝藤藥藩藪藷藹藺藻藾蘂蘆蘇蘊蘋蘓蘖蘗蘚蘢蘭蘯蘰蘿虍虎虐虔處虚虜虞號虧虫虱虹虻蚊蚋蚌蚓蚕蚣蚤蚩蚪蚫蚯蚰蚶蛄蛆蛇蛉蛋蛍蛎蛔蛙蛛蛞蛟蛤蛩蛬蛭蛮蛯蛸蛹蛻蛾蜀蜂蜃蜆蜈蜉蜊蜍蜑蜒蜘蜚蜜蜥蜩蜴蜷蜻蜿蝉蝋蝌蝎蝓蝕蝗蝙蝟蝠蝣蝦蝨蝪蝮蝴蝶蝸蝿螂融螟螢螫螯螳螺螻螽蟀蟄蟆蟇蟋蟐蟒蟠蟯蟲蟶蟷蟹蟻蟾蠅蠇蠍蠎蠏蠑蠕蠖蠡蠢蠣蠧蠱蠶蠹蠻血衂衄衆行衍衒術街衙衛衝衞衡衢衣表衫衰衲衵衷衽衾衿袁袂袈袋袍袒袖袗袙袞袢袤被袮袰袱袴袵袷袿裁裂裃裄装裏裔裕裘裙補裝裟裡裨裲裳裴裵裸裹裼製裾褂褄複褊褌褐褒褓褜褝褞褥褪褫褶褸褻襁襃襄襌襍襖襞襟襠襤襦襪襭襯襲襴襷襾西要覃覆覇覈覊見規覓視覗覘覚覡覦覧覩親覬覯覲観覺覽覿觀角觚觜觝解触觧觴觸言訂訃計訊訌討訐訒訓訖託記訛訝訟訣訥訪設許訳訴訶訷診註証詁詆詈詐詑詒詔評詛詞詠詢詣試詩詫詬詭詮詰話該詳詹詼誂誄誅誇誉誌認誑誓誕誘誚語誠誡誣誤誥誦誧誨説読誰課誹誼誾調諂諄談請諌諍諏諒論諚諛諜諞諟諠諡諢諤諦諧諫諭諮諱諳諶諷諸諺諾謀謁謂謄謇謌謎謐謔謖謗謙謚講謝謠謡謦謨謫謬謳謹謾譁證譌譎譏譓譖識譚譛譜譟警譫譬譯議譱譲譴護譽譿讀讃變讌讎讐讒讓讖讙讚谷谺谿豁豆豈豊豌豎豐豕豚象豢豪豫豬豸豹豺豼貂貅貉貊貌貍貎貔貘貝貞負財貢貧貨販貪貫責貭貮貯貰貲貳貴貶買貸費貼貽貿賀賁賂賃賄資賈賊賍賎賑賓賚賛賜賞賠賢賣賤賦質賭賰賴賺賻購賽贄贅贇贈贊贋贍贏贐贒贓贔贖赤赦赧赫赭走赱赳赴赶起趁超越趙趣趨足趺趾跂跋跌跏跖跚跛距跟跡跣跨跪跫路跳践跼跿踈踉踊踏踐踝踞踟踪踰踴踵蹂蹄蹇蹈蹉蹊蹌蹐蹕蹙蹟蹠蹣蹤蹲蹴蹶蹼躁躄躅躇躊躋躍躑躓躔躙躡躪身躬躯躰躱躾軅軆軈車軋軌軍軏軒軛軟転軣軫軸軻軼軽軾較輅載輊輌輒輓輔輕輙輛輜輝輟輦輩輪輯輳輸輹輻輾輿轂轄轅轆轉轌轍轎轗轜轟轡轢轣轤辛辜辞辟辣辧辨辭辮辯辰辱農辷辺辻込辿迂迄迅迎近返迚迢迥迦迩迪迫迭迯述迴迷迸迹迺追退送逃逅逆逋逍逎透逐逑逓途逕逖逗這通逝逞速造逡逢連逧逮週進逵逶逸逹逼逾遁遂遅遇遉遊運遍過遏遐遑遒道達違遖遘遙遜遞遠遡遣遥遧遨適遭遮遯遲遵遶遷選遺遼遽避邀邁邂邃還邇邉邊邏邑那邦邨邪邯邱邵邸郁郊郎郛郞郡郢郤部郭郵郷都鄂鄒鄕鄙鄧鄭鄰鄲酉酊酋酌配酎酒酔酖酘酢酣酥酩酪酬酲酳酵酷酸醂醇醉醋醍醐醒醗醜醢醤醪醫醯醴醵醸醺釀釁釆采釈釉釋里重野量釐金釖釗釘釚釛釜針釞釟釡釣釤釥釦釧釭釮釵釶釼釿鈆鈊鈍鈎鈐鈑鈔鈕鈞鈩鈬鈴鈷鈹鈺鈼鈿鉀鉄鉅鉈鉉鉋鉎鉐鉑鉗鉙鉚鉛鉞鉢鉤鉦鉧鉱鉷鉸鉾銀銃銅銈銑銓銕銖銘銚銛銜銧銭銷銹鋏鋐鋒鋓鋕鋗鋙鋠鋤鋧鋩鋪鋭鋲鋳鋸鋹鋺鋻鋼鋿錂錆錏錐錘錙錚錝錞錠錡錢錣錥錦錨錫錬錮錯録錵錺錻鍄鍈鍋鍍鍔鍖鍗鍛鍜鍠鍬鍮鍰鍵鍼鍾鎌鎔鎖鎗鎚鎤鎧鎬鎭鎮鎰鎹鏃鏆鏈鏐鏑鏖鏗鏘鏝鏞鏡鏤鏥鏨鏸鐃鐇鐐鐓鐔鐘鐙鐚鐡鐫鐱鐵鐶鐸鐺鑁鑄鑅鑈鑑鑒鑓鑚鑛鑞鑠鑢鑪鑰鑵鑷鑼鑽鑾鑿钁長門閂閃閇閉閊開閏閑閒間閔閖閘閙閠関閣閤閥閧閨閭閲閹閻閼閾闃闇闊闌闍闔闕闖闘關闡闢闥阜阡阨阪阮阯防阻阿陀陂附陋陌降陏限陛陜陝陞陟院陣除陥陦陪陬陰陲陳陵陶陷陸険陽隅隆隈隊隋隍階随隔隕隗隘隙際障隝隠隣隧隨險隯隰隱隲隴隶隷隸隹隻隼雀雁雄雅集雇雉雋雌雍雎雑雕雖雙雛雜離難雨雪雫雰雲零雷雹電需霄霆震霈霊霍霎霏霑霓霖霙霜霞霤霧霪霰露霳霸霹霻霽霾靂靃靄靆靈靉靍靏靑青靕靖静靜非靠靡面靤靦靨革靫靭靱靴靹靺靼鞁鞄鞅鞆鞋鞍鞏鞐鞘鞜鞠鞣鞦鞨鞫鞭鞳鞴韃韆韈韋韓韜韭韮韲音韵韶韻響頁頂頃項順須頌頏預頑頒頓頗領頚頡頤頬頭頴頷頸頻頼頽顆顋題額顎顏顔顕顗願顛類顥顧顫顯顰顱顳顴風颪颯颱颶飃飄飆飛飜食飢飩飫飭飮飯飲飴飼飽飾餃餅餉養餌餐餒餓餔餘餝餞餠餡餤餧館餬餮餽餾饂饅饉饋饌饐饑饒饕饗首馗馘香馞馥馨馬馭馮馳馴馼駁駄駅駆駈駐駑駒駕駘駛駝駟駢駭駮駱駲駸駻駿騁騅騎騏騒験騙騨騫騰騷騾驀驂驃驅驍驎驕驗驚驛驟驢驤驥驩驪驫骨骭骰骸骼髀髄髏髑髓體高髙髜髞髟髢髣髦髪髫髭髮髯髱髴髷髻鬆鬘鬚鬟鬢鬣鬥鬧鬨鬩鬪鬮鬯鬱鬲鬻鬼魁魂魃魄魅魍魎魏魑魔魘魚魯魲魴魵鮃鮎鮏鮑鮒鮓鮖鮗鮟鮠鮨鮪鮫鮭鮮鮱鮴鮹鮻鯀鯆鯉鯊鯏鯑鯒鯔鯖鯛鯡鯢鯣鯤鯨鯰鯱鯲鯵鰀鰄鰆鰈鰉鰊鰌鰍鰐鰒鰓鰔鰕鰛鰡鰤鰥鰭鰮鰯鰰鰲鰹鰺鰻鰾鱆鱇鱈鱒鱗鱚鱠鱧鱶鱸鳥鳧鳩鳫鳬鳰鳳鳴鳶鴃鴆鴇鴈鴉鴎鴒鴕鴛鴟鴣鴦鴨鴪鴫鴬鴻鴾鴿鵁鵄鵆鵈鵐鵑鵙鵜鵝鵞鵠鵡鵤鵫鵬鵯鵰鵲鵺鶇鶉鶏鶚鶤鶩鶫鶯鶲鶴鶸鶺鶻鷁鷂鷄鷆鷏鷓鷙鷦鷭鷯鷲鷸鷹鷺鷽鸙鸚鸛鸞鹵鹸鹹鹽鹿麁麈麋麌麑麒麓麕麗麝麟麥麦麩麪麭麸麹麺麻麼麾麿黄黌黍黎黏黐黑黒黔默黙黛黜黝點黠黥黨黯黴黶黷黹黻黼黽鼇鼈鼎鼓鼕鼠鼡鼬鼻鼾齊齋齎齏齒齔齟齠齡齢齣齦齧齪齬齲齶齷龍龕龜龝龠朗隆﨎﨏塚﨑晴﨓﨔凞猪益礼神祥福靖精羽﨟蘒﨡諸﨣﨤逸都﨧﨨﨩飯飼館鶴！＂＃＄％＆＇（）＊＋，－．／０１２３４５６７８９：；＜＝＞？＠ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ［＼］＾＿｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ｛｜｝～｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ￠￡￢￣￤￥");

	function convertCharRef(s) {
		return s
			.split('')
			.map(char =>
				nonEscapedCharSet.has(char)
					? char
					: `&#${char.charCodeAt(0)};`
			)
			.join('');
	}

	// document.forms.open_by_page_name_form.page_name.focus();

	function openPageByName(pageName, openInNewTab = false){
		if(pageName != ""){
			pageName = convertCharRef(pageName)
			pageName = encodeEUCJP(pageName)
			const url = "https://seesaawiki.jp/kemono_friends3_5ch/d/" + pageName;

			if(openInNewTab) window.open(url);
			else location.href = url;
		}
	}

	async function enhanceMobileSearchFunctionality() {
		await loadEncodingJS();
		const searchForm = document.getElementById('internal-wiki-search');
		const radioList = searchForm.querySelector('.form-radio');
		const keywordsInput = searchForm.querySelector('input[name="keywords"]');

		// ページ名検索をデフォルトで選択
		const pageNameRadio = radioList.querySelector('input[value="page_name"]');
		if (pageNameRadio) {
			pageNameRadio.checked = true;
		}

		// 直接開くオプションを追加
		const directOpenLi = document.createElement('li');
		const directOpenLabel = document.createElement('label');
		const directOpenRadio = document.createElement('input');
		directOpenRadio.type = 'radio';
		directOpenRadio.name = 'search_target';
		directOpenRadio.value = 'page_name';
		directOpenLabel.appendChild(directOpenRadio);
		directOpenLabel.appendChild(document.createTextNode(' 直接開く'));
		directOpenLi.appendChild(directOpenLabel);

		// ページ名とタグの間に直接開く選択肢を挿入
		const tagLi = radioList.querySelector('input[value="tag"]').closest('li');
		radioList.insertBefore(directOpenLi, tagLi);

		// フォーム送信時の動作を変更
		searchForm.addEventListener('submit', function(e) {
			if (directOpenRadio.checked) {
				e.preventDefault();
				const keyword = keywordsInput.value;
				openPageByName(keyword);
			}
		});
		searchForm.addEventListener('keydown', function(e) {
			if (e.key === 'Enter' || e.keyCode === 13) {
				if (directOpenRadio.checked) {
					e.preventDefault();
					const keyword = keywordsInput.value;
					openPageByName(keyword);
				}
			}
		});
	}

	// =====================================================================================
	//  tablesorter
	//  URL: https://cdnjs.com/libraries/jquery.tablesorter
	// =====================================================================================
	async function loadTableSorterScripts() {
		const scripts = [
			{
				src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.min.js",
				attributes: {
					integrity: "sha512-qzgd5cYSZcosqpzpn7zF2ZId8f/8CHmFKZ8j7mU4OUXTNRd5g+ZHBPsgKEwoqxCtdQvExE5LprwwPAgoicguNg==",
					crossorigin: "anonymous",
					referrerpolicy: "no-referrer"
				}
			},
			{
				src: "https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.31.3/js/jquery.tablesorter.widgets.min.js",
				attributes: {
					integrity: "sha512-dj/9K5GRIEZu+Igm9tC16XPOTz0RdPk9FGxfZxShWf65JJNU2TjbElGjuOo3EhwAJRPhJxwEJ5b+/Ouo+VqZdQ==",
					crossorigin: "anonymous",
					referrerpolicy: "no-referrer"
				}
			}
		];

		for (const script of scripts) {
			try {
				await loadScript(script.src, script.attributes);
			} catch (error) {
				console.error(`Failed to load script: ${script.src}`, error);
			}
		}
	}

	function disableTableSorter() {
		// CSSを無効化
		disableStylesheet('js/wiki_plugin/tablesorter/themes/pc/style.css')

		$('table').each(function() {
			const $table = $(this);
			$table.find('thead th').each(function() {
				var $th = $(this);

				// イベントリスナーを削除
				$th.unbind().off();

				// スタイルをリセット
				$th.css({
					'cursor': 'default',
				});

				// データ属性を削除
				$th.removeData();
			});

			// テーブル自体のデータと属性を削除
			$table.removeData();
		});


		// jQueryプラグインを無効化
		$.fn.tablesorter = function() {	return this; };
		$.tablesorter = {};
	}

	async function applyTableSorter() {
		try {
			// $.fn.tablesorterが利用可能になるまで待機
			await new Promise(resolve => {
				const intervalId = setInterval(() => {
					if ($.fn.tablesorter) {
						clearInterval(intervalId);
						resolve();
					}
				}, 100);
			});

			// 既存のtablesorterをすべて無効化
			disableTableSorter();

			// TableSorterスクリプトを読み込む
			await loadTableSorterScripts();

			// 日付+テキストのパーサー追加
			$.tablesorter.addParser({
				id: 'dateWithText',
				is: function(s) {
					// yyyy/mm/dd, yyyy-mm-dd, yyyy年mm月dd日 の形式を検出
					// 0埋めありなしどちらにも対応
					const datePattern = /^\s*(\d{4})[\/\-年](\d{1,2})[\/\-月](\d{1,2})[日]?/;

					// 先頭の空白を無視して日付形式かどうかをチェック
					return datePattern.test(s.trim());
				},
				format: function(s) {
					const datePattern = /(\d{4})[\/\-年](\d{1,2})[\/\-月](\d{1,2})[日]?/;

					const match = s.match(datePattern);
					if (match) {
						// 年月日を取得
						const year = parseInt(match[1], 10);
						const month = parseInt(match[2], 10) - 1; // JavaScriptの月は0始まり
						const day = parseInt(match[3], 10);

						// 不正な日付をチェック
						if (month < 0 || month > 11 || day < 1 || day > 31) {
							return 0;
						}

						// 日付オブジェクトを作成
						const date = new Date(year, month, day);

						// 実際に存在する日付かどうかを確認
						if (date.getFullYear() === year &&
							date.getMonth() === month &&
							date.getDate() === day) {
							return date.getTime();
						}
					}
					return 0; // 日付が見つからないか不正な場合は0を返す
				},
				type: 'numeric'
			});

			$("table.filter").each(function(i){
				const $table = $(this);

				// External any-column search
				const $divInputTableFilter = $("<div>", {
					"class": "input-table-filter input-table-filter-ex",
					style: "width: 400px; display: flex; align-items: center;"
				});

				const $inputTableFilter = $("<input>", {
					type: "search",
					placeholder: "キーワードで絞り込み",
					"data-column": "all",
					style: "flex: 1; background-color: white; margin-right: 10px;",
				}).appendTo($divInputTableFilter);

				// Reset button
				// const $resetButton = $("<button>", {
				// 	text: "リセット",
				// 	"class": "reset-table-filter",
				// }).appendTo($divInputTableFilter);

				$table.before($divInputTableFilter);

				// Drop down menu
				const filterFunc = null;
				// const filterFunc = {};
				// let i = 0;
				// $table.find("th").each(function(){
				//     const text = $(this).text();
				//     if(text.indexOf("属性") != -1){
				//         filterFunc[i] = {
				//             "ファニー" : function(e, n, f, i, $r, c, data) { return /ファニー/.test(e); },
				//             "フレンドリー" : function(e, n, f, i, $r, c, data) { return /フレンドリー/.test(e); },
				//             "リラックス" : function(e, n, f, i, $r, c, data) { return /リラックス/.test(e); },
				//             "ラブリー" : function(e, n, f, i, $r, c, data) { return /ラブリー/.test(e); },
				//             "アクティブ" : function(e, n, f, i, $r, c, data) { return /アクティブ/.test(e); },
				//             "マイペース" : function(e, n, f, i, $r, c, data) { return /マイペース/.test(e); }
				//         };
				//     }
				//     else if(text.indexOf("☆") != -1 || text.indexOf("☆") != -1){
				//         filterFunc[i] = {
				//             "☆4" : function(e, n, f, i, $r, c, data) { return /4/.test(e); },
				//             "☆3" : function(e, n, f, i, $r, c, data) { return /3/.test(e); },
				//             "☆2" : function(e, n, f, i, $r, c, data) { return /2/.test(e); },
				//             "☆1" : function(e, n, f, i, $r, c, data) { return /1/.test(e); }
				//         };
				//     }
				//     i++;
				// });


				$table.find('th').each(function() {
					$(this).addClass('tablesorter-blue');
				});

				$table.tablesorter({
					theme: 'blue',

					headers: {
						".tablesorter-header-inner": {
							sorter: $table.hasClass("sort")
						}
					},

					// hidden filter input/selects will resize the columns, so try to minimize the change
					widthFixed : false,


					ignoreCase: true,

					// 3回クリック時にソートをリセット
					sortReset: true,

					// 最初にソートしたときのソート順
					sortInitialOrder: 'desc',

					// 空白行のソート位置を最下部に変更
					emptyTo: 'bottom',

					// initialize filter widgets
					widgets: ["filter"],

					widgetOptions : {
						// filter_anyMatch options was removed in v2.15; it has been replaced by the filter_external option

						// If there are child rows in the table (rows with class name from "cssChildRow" option)
						// and this option is true and a match is found anywhere in the child row, then it will make that row
						// visible; default is false
						filter_childRows : false,

						// if true, filter child row content by column; filter_childRows must also be true
						filter_childByColumn : false,

						// if true, include matching child row siblings
						filter_childWithSibs : false,

						// if true, a filter will be added to the top of each table column;
						// disabled by using -> headers: { 1: { filter: false } } OR add class="filter-false"
						// if you set this to false, make sure you perform a search using the second method below
						filter_columnFilters : true,

						// if true, allows using "#:{query}" in AnyMatch searches (column:query; added v2.20.0)
						filter_columnAnyMatch: true,

						// extra css class name (string or array) added to the filter element (input or select)
						filter_cellFilter : '',

						// extra css class name(s) applied to the table row containing the filters & the inputs within that row
						// this option can either be a string (class applied to all filters) or an array (class applied to indexed filter)
						filter_cssFilter : '', // or []

						// add a default column filter type "~{query}" to make fuzzy searches default;
						// "{q1} AND {q2}" to make all searches use a logical AND.
						filter_defaultFilter : {},

						// filters to exclude, per column
						filter_excludeFilter : {},

						// jQuery selector (or object) pointing to an input to be used to match the contents of any column
						// please refer to the filter-any-match demo for limitations - new in v2.15
						filter_external : $inputTableFilter,

						// class added to filtered rows (rows that are not showing); needed by pager plugin
						filter_filteredRow : 'filtered',

						// ARIA-label added to filter input/select; {{label}} is replaced by the column header
						// "data-label" attribute, if it exists, or it uses the column header text
						filter_filterLabel : 'Filter "{{label}}" column by...',

						// add custom filter elements to the filter row
						// see the filter formatter demos for more specifics on how to use this option
						filter_formatter : null,

						// add custom filter functions using this option
						// see the filter widget custom demo for more specifics on how to use this option
						filter_functions : filterFunc,

						// hide filter row when table is empty
						filter_hideEmpty : false,

						// if true, filters are collapsed initially, but can be revealed by hovering over the grey bar immediately
						// below the header row. Additionally, tabbing through the document will open the filter row when an input gets focus
						// in v2.26.6, this option will also accept a function
						filter_hideFilters : false,

						// Set this option to false to make the searches case sensitive
						filter_ignoreCase : true,

						// if true, search column content while the user types (with a delay).
						// In v2.27.3, this option can contain an
						// object with column indexes or classnames; "fallback" is used
						// for undefined columns
						filter_liveSearch : true,

						// global query settings ('exact' or 'match'); overridden by "filter-match" or "filter-exact" class
						filter_matchType : { 'input': 'match', 'select': 'match' },

						// a header with a select dropdown & this class name will only show available (visible) options within that drop down.
						filter_onlyAvail : 'filter-onlyAvail',

						// default placeholder text (overridden by any header "data-placeholder" setting)
						filter_placeholder : { search : '検索', select : '選択' },

						// jQuery selector string of an element used to reset the filters
						filter_reset : 'button.reset-table-filter',

						// Reset filter input when the user presses escape - normalized across browsers
						filter_resetOnEsc : true,

						// Use the $.tablesorter.storage utility to save the most recent filters (default setting is false)
						filter_saveFilters : false,

						// Delay in milliseconds before the filter widget starts searching; This option prevents searching for
						// every character while typing and should make searching large tables faster.
						filter_searchDelay : 300,

						// allow searching through already filtered rows in special circumstances; will speed up searching in large tables if true
						filter_searchFiltered: true,

						// include a function to return an array of values to be added to the column filter select
						filter_selectSource  : null,

						// if true, server-side filtering should be performed because client-side filtering will be disabled, but
						// the ui and events will still be used.
						filter_serversideFiltering : false,

						// Set this option to true to use the filter to find text from the start of the column
						// So typing in "a" will find "albert" but not "frank", both have a's; default is false
						filter_startsWith : false,

						// Filter using parsed content for ALL columns
						// be careful on using this on date columns as the date is parsed and stored as time in seconds
						filter_useParsedData : false,

						// data attribute in the header cell that contains the default filter value
						filter_defaultAttrib : 'data-value',

						// filter_selectSource array text left of the separator is added to the option value, right into the option text
						filter_selectSourceSeparator : '|'
					}
				});
			});


			addCSS(`
				/*************
				Blue Theme
				*************/
				/* overall */
				.tablesorter-blue {
					/* width: 100%; */
					background-color: #fff;
					margin: 10px 0 15px;
					text-align: left;
					border-spacing: 0;
					border: #cdcdcd 1px solid;
					border-width: 1px 0 0 1px;
				}
				.tablesorter-blue th,
				.tablesorter-blue td {
					border: #cdcdcd 1px solid;
					border-width: 0 1px 1px 0;
				}

				/* header */
				/* .tablesorter-blue th,
				.tablesorter-blue thead td {
					font: 12px/18px Arial, Sans-serif;
					font-weight: bold;
					color: #000;
					background-color: #99bfe6;
					border-collapse: collapse;
					padding: 4px;
					text-shadow: 0 1px 0 rgba(204, 204, 204, 0.7);
				} */
				/* .tablesorter-blue tbody td,
				.tablesorter-blue tfoot th,
				.tablesorter-blue tfoot td {
					padding: 4px;
					vertical-align: top;
				} */
				.tablesorter-blue .header,
				.tablesorter-blue .tablesorter-header {
					/* black (unsorted) double arrow */
					background-image: url(data:image/gif;base64,R0lGODlhFQAJAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==) !important;
					/* white (unsorted) double arrow */
					/* background-image: url(data:image/gif;base64,R0lGODlhFQAJAIAAAP///////yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==); */
					/* image */
					/* background-image: url(images/black-unsorted.gif); */
					background-repeat: no-repeat;
					background-position: center right;
					padding: 4px 18px 4px 4px;
					white-space: normal;
					cursor: pointer !important;
				}
				.tablesorter-blue .headerSortUp,
				.tablesorter-blue .tablesorter-headerSortUp,
				.tablesorter-blue .tablesorter-headerAsc {
					background-color: #9fbfdf !important;
					/* black asc arrow */
					background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7) !important;
					/* white asc arrow */
					/* background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7); */
					/* image */
					/* background-image: url(images/black-asc.gif); */
				}
				.tablesorter-blue .headerSortDown,
				.tablesorter-blue .tablesorter-headerSortDown,
				.tablesorter-blue .tablesorter-headerDesc {
					background-color: #8cb3d9 !important;
					/* black desc arrow */
					background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7) !important;
					/* white desc arrow */
					/* background-image: url(data:image/gif;base64,R0lGODlhFQAEAIAAAP///////yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7); */
					/* image */
					/* background-image: url(images/black-desc.gif); */
				}
				.tablesorter-blue thead .sorter-false {
					background-image: none !important;
					cursor: default !important;
					padding: 4px;
				}

				/* tfoot */
				.tablesorter-blue tfoot .tablesorter-headerSortUp,
				.tablesorter-blue tfoot .tablesorter-headerSortDown,
				.tablesorter-blue tfoot .tablesorter-headerAsc,
				.tablesorter-blue tfoot .tablesorter-headerDesc {
					/* remove sort arrows from footer */
					background-image: none;
				}

				/* tbody */
				/* .tablesorter-blue td {
					color: #3d3d3d;
					background-color: #fff;
					padding: 4px;
					vertical-align: top;
				} */

				/* hovered row colors
				you'll need to add additional lines for
				rows with more than 2 child rows
				*/
				/* .tablesorter-blue tbody > tr.hover > td,
				.tablesorter-blue tbody > tr:hover > td,
				.tablesorter-blue tbody > tr:hover + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr:hover + tr.tablesorter-childRow + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr.even.hover > td,
				.tablesorter-blue tbody > tr.even:hover > td,
				.tablesorter-blue tbody > tr.even:hover + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr.even:hover + tr.tablesorter-childRow + tr.tablesorter-childRow > td {
					background-color: #d9d9d9;
				}
				.tablesorter-blue tbody > tr.odd.hover > td,
				.tablesorter-blue tbody > tr.odd:hover > td,
				.tablesorter-blue tbody > tr.odd:hover + tr.tablesorter-childRow > td,
				.tablesorter-blue tbody > tr.odd:hover + tr.tablesorter-childRow + tr.tablesorter-childRow > td {
					background-color: #bfbfbf;
				} */

				/* table processing indicator */
				.tablesorter-blue .tablesorter-processing {
					background-position: center center !important;
					background-repeat: no-repeat !important;
					/* background-image: url(images/loading.gif) !important; */
					background-image: url('data:image/gif;base64,R0lGODlhFAAUAKEAAO7u7lpaWgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgACACwAAAAAFAAUAAACQZRvoIDtu1wLQUAlqKTVxqwhXIiBnDg6Y4eyx4lKW5XK7wrLeK3vbq8J2W4T4e1nMhpWrZCTt3xKZ8kgsggdJmUFACH5BAEKAAIALAcAAAALAAcAAAIUVB6ii7jajgCAuUmtovxtXnmdUAAAIfkEAQoAAgAsDQACAAcACwAAAhRUIpmHy/3gUVQAQO9NetuugCFWAAAh+QQBCgACACwNAAcABwALAAACE5QVcZjKbVo6ck2AF95m5/6BSwEAIfkEAQoAAgAsBwANAAsABwAAAhOUH3kr6QaAcSrGWe1VQl+mMUIBACH5BAEKAAIALAIADQALAAcAAAIUlICmh7ncTAgqijkruDiv7n2YUAAAIfkEAQoAAgAsAAAHAAcACwAAAhQUIGmHyedehIoqFXLKfPOAaZdWAAAh+QQFCgACACwAAAIABwALAAACFJQFcJiXb15zLYRl7cla8OtlGGgUADs=') !important;
				}

				/* Zebra Widget - row alternating colors */
				.tablesorter-blue tbody tr.odd > td {
					background-color: #ebf2fa;
				}
				.tablesorter-blue tbody tr.even > td {
					background-color: #fff;
				}

				/* Column Widget - column sort colors */
				.tablesorter-blue td.primary,
				.tablesorter-blue tr.odd td.primary {
					background-color: #99b3e6;
				}
				.tablesorter-blue tr.even td.primary {
					background-color: #c2d1f0;
				}
				.tablesorter-blue td.secondary,
				.tablesorter-blue tr.odd td.secondary {
					background-color: #c2d1f0;
				}
				.tablesorter-blue tr.even td.secondary {
					background-color: #d6e0f5;
				}
				.tablesorter-blue td.tertiary,
				.tablesorter-blue tr.odd td.tertiary {
					background-color: #d6e0f5;
				}
				.tablesorter-blue tr.even td.tertiary {
					background-color: #ebf0fa;
				}

				/* caption */
				.tablesorter-blue > caption {
					background-color: #fff;
				}

				/* filter widget */
				.tablesorter-blue .tablesorter-filter-row {
					background-color: #eee;
				}
				.tablesorter-blue .tablesorter-filter-row td {
					background-color: #eee;
					line-height: normal;
					text-align: center; /* center the input */
					-webkit-transition: line-height 0.1s ease;
					-moz-transition: line-height 0.1s ease;
					-o-transition: line-height 0.1s ease;
					transition: line-height 0.1s ease;
				}
				/* optional disabled input styling */
				.tablesorter-blue .tablesorter-filter-row .disabled {
					opacity: 0.5;
					filter: alpha(opacity=50);
					cursor: not-allowed;
				}
				/* hidden filter row */
				.tablesorter-blue .tablesorter-filter-row.hideme td {
					/*** *********************************************** ***/
					/*** change this padding to modify the thickness     ***/
					/*** of the closed filter row (height = padding x 2) ***/
					padding: 2px;
					/*** *********************************************** ***/
					margin: 0;
					line-height: 0;
					cursor: pointer;
				}
				.tablesorter-blue .tablesorter-filter-row.hideme * {
					height: 1px;
					min-height: 0;
					border: 0;
					padding: 0;
					margin: 0;
					/* don't use visibility: hidden because it disables tabbing */
					opacity: 0;
					filter: alpha(opacity=0);
				}
				/* filters */
				.tablesorter-blue input.tablesorter-filter,
				.tablesorter-blue select.tablesorter-filter {
					width: 98%;
					height: auto;
					margin: 0;
					padding: 4px;
					background-color: #fff;
					border: 1px solid #bbb;
					color: #333;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					-webkit-transition: height 0.1s ease;
					-moz-transition: height 0.1s ease;
					-o-transition: height 0.1s ease;
					transition: height 0.1s ease;
				}
				/* rows hidden by filtering (needed for child rows) */
				.tablesorter .filtered {
					display: none;
				}

				/* ajax error row */
				.tablesorter .tablesorter-errorRow td {
					text-align: center;
					cursor: pointer;
					background-color: #e6bf99;
				}

				.input-table-filter:not(.input-table-filter-ex){
					display: none !important;
				}
			`);


		} catch (error) {
			console.error("Error in applyTableSorter():", error);
		}
	}


	/**
	* 指定されたソースからスクリプトを読み込み、成功時と失敗時にそれぞれ解決または拒否されるPromiseを返します。
	* @param {string} src - スクリプトのソースURL。
	* @param {Object} attributes - スクリプト要素に追加する任意の属性。
	* @returns {Promise<void>} スクリプトの読み込みの完了を示すPromise。
	*/
	function loadScript(src, attributes = {}) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;

			// デフォルトでcrossorigin属性を設定
			if (!attributes.hasOwnProperty('crossorigin')) {
				script.crossOrigin = 'anonymous';
			}

			// Set custom attributes
			for (const [key, value] of Object.entries(attributes)) {
				script.setAttribute(key, value);
			}

			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	/**
	 * CSSを動的に追加します。
	 * @param {string} css - 追加するCSSコード。
	 */
	function addCSS(css){
		const style = document.createElement("style");
		style.innerHTML = css;
		document.head.append(style);
	}

	function disableStylesheet(href) {
		const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
		links.filter(link => link.href.includes(href)).forEach(link => link.disabled = true);
	}
})();