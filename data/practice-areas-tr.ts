// ─── TR PRACTICE AREA DATA ─────────────────────────────────────────────────
// Her alan: title, slug, metaDescription, keywords, heroSummary, whatIs,
//           services[], process[], faqs[], whyUs[]
// ────────────────────────────────────────────────────────────────────────────

export interface PracticeAreaData {
    title: string
    slug: string
    metaDescription: string
    keywords: string[]
    heroSummary: string
    trustBadge: string
    whatIsTitle: string
    whatIsContent: string[]
    servicesTitle: string
    services: { name: string; description: string }[]
    processTitle: string
    processSteps: { step: string; detail: string }[]
    faqTitle: string
    faqs: { question: string; answer: string }[]
    whyUsTitle: string
    whyUs: { title: string; description: string }[]
    ctaTitle: string
    ctaDescription: string
}

export const PRACTICE_AREAS_TR: Record<string, PracticeAreaData> = {
    "aile-hukuku": {
        title: "Aile Hukuku",
        slug: "aile-hukuku",
        metaDescription:
            "İzmir aile hukuku avukatı | Boşanma, velayet, nafaka, mal paylaşımı, koruma kararı, evlat edinme ve soybağı davalarında uzman hukuki destek. Taş Hukuk & Danışmanlık.",
        keywords: ["izmir aile hukuku avukatı", "izmir boşanma avukatı", "boşanma davası", "velayet davası", "nafaka davası", "mal paylaşımı", "koruma kararı", "evlat edinme", "soybağı davası", "aile içi şiddet", "anlaşmalı boşanma", "çekişmeli boşanma"],
        heroSummary:
            "Aile hukukunun tüm alanlarında — boşanmadan velayete, nafakadan koruma kararlarına, evlat edinmeden soybağı davalarına kadar — haklarınızı titizlikle koruyan, gizlilik ilkesine bağlı profesyonel avukatlık hizmeti sunuyoruz. Ailenizle ilgili her hukuki süreçte yanınızdayız.",
        trustBadge: "İzmir'de uzman aile hukuku avukatı desteği",
        whatIsTitle: "Aile Hukuku Nedir?",
        whatIsContent: [
            "Aile hukuku, kişilerin aile ilişkilerinden doğan hak ve yükümlülüklerini düzenleyen özel hukuk dalıdır. Türk Medeni Kanunu'nun ikinci kitabı olan \"Aile Hukuku\" başlığı altında; nişanlanma, evlenme, boşanma, evlilik birliğinin genel hükümleri, eşler arası mal rejimi, soybağı, evlat edinme, velayet, vesayet ve nafaka gibi konular kapsamlı şekilde düzenlenir.",
            "Aile hukuku, bireylerin en kişisel ve hassas ilişkilerini doğrudan etkileyen bir alan olması nedeniyle özel bir uzmanlık gerektirir. Boşanma sürecindeki velayet ve nafaka kararlarından aile içi şiddete karşı koruma tedbirlerine, evlat edinme işlemlerinden soybağının reddi veya tespiti davalarına kadar geniş bir yelpazede hukuki sorunlar ortaya çıkar.",
            "Aile hukuku davalarında sürecin doğru yönetilmesi, tarafların ve özellikle çocukların geleceğini doğrudan belirler. Bu nedenle aile hukuku alanında uzmanlaşmış bir avukatla çalışmak, hem hukuki haklarınızın eksiksiz korunması hem de duygusal açıdan zorlu süreçlerin profesyonel yönetimi açısından büyük önem taşır. Taş Hukuk & Danışmanlık olarak, İzmir'de aile hukukunun her alanında deneyimli kadromuzla müvekkillerimize kapsamlı hukuki destek sunuyoruz.",
        ],
        servicesTitle: "Aile Hukukunda Sunduğumuz Hizmetler",
        services: [
            { name: "Boşanma Davaları (Anlaşmalı ve Çekişmeli)", description: "Anlaşmalı boşanma protokolü hazırlama, çekişmeli boşanma davalarında kusur tespiti, delil yönetimi ve mahkeme sürecinin etkin takibi. Evlilik birliğinin sona erdirilmesinde haklarınızın tam olarak korunması." },
            { name: "Velayet ve Kişisel İlişki Davaları", description: "Çocuğun üstün yararı ilkesi doğrultusunda velayet hakkının kazanılması, velayetin değiştirilmesi, kişisel ilişki (görüşme) düzenlenmesi ve uluslararası çocuk kaçırma davalarında hukuki temsil." },
            { name: "Nafaka Davaları", description: "Tedbir nafakası, yoksulluk nafakası, iştirak nafakası ve yardım nafakası taleplerinin hazırlanması; nafakanın artırılması, azaltılması veya kaldırılması davalarının takibi." },
            { name: "Mal Paylaşımı ve Mal Rejimi Davaları", description: "Edinilmiş mallara katılma rejimi kapsamında katılma alacağı hesaplaması, katkı payı alacağı, değer artış payı ve mal rejiminin tasfiyesi davalarının yönetimi." },
            { name: "Koruma Kararları (6284 Sayılı Kanun)", description: "Aile içi şiddet, tehdit ve taciz durumlarında 6284 sayılı Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair Kanun kapsamında acil koruma ve önleyici tedbir kararları alınması." },
            { name: "Evlat Edinme ve Soybağı Davaları", description: "Evlat edinme başvuru süreçlerinin yönetimi, soybağının reddi, babalık davası, tanıma ve soybağının düzeltilmesi davalarında hukuki destek." },
        ],
        processTitle: "Aile Hukuku Davası Süreci Nasıl İşler?",
        processSteps: [
            { step: "Ön Görüşme ve Durum Değerlendirmesi", detail: "Aile hukukundan kaynaklanan sorununuzu detaylı dinler, hukuki haklarınızı ve başvuru yollarınızı açıkça ortaya koyarız. Bu aşamada gizlilik güvencesi altında tüm bilgileriniz korunur." },
            { step: "Strateji ve Yol Haritası Belirleme", detail: "Davanızın niteliğine göre — boşanma, velayet, nafaka, koruma kararı veya evlat edinme — en uygun hukuki stratejiyi birlikte belirleriz." },
            { step: "Dava Dilekçesi ve Başvuru Hazırlığı", detail: "Hukuki gerekçeler, talepler ve destekleyici belgeler doğrultusunda kapsamlı dava dilekçesi veya başvuru dosyası hazırlarız." },
            { step: "Delil Toplama ve Belge Derleme", detail: "Tanık beyanları, uzman raporları (pedagog, psikolog, sosyal inceleme), mali belgeler ve dijital deliller dahil tüm ispat araçlarını sistematik şekilde toplarız." },
            { step: "Mahkeme Süreci ve Duruşma Temsili", detail: "Aile mahkemesinde sizi etkin şekilde temsil eder, karşı taraf iddialarına güçlü savunma hazırlar ve haklarınızı koruruz." },
            { step: "Karar ve Uygulama Takibi", detail: "Mahkeme kararının kesinleşmesini, nafaka ödemelerinin başlatılmasını, velayet kararlarının uygulanmasını ve gerektiğinde icra takibini yönetiriz." },
        ],
        faqTitle: "Aile Hukuku Hakkında Sıkça Sorulan Sorular",
        faqs: [
            { question: "Anlaşmalı boşanma ne kadar sürer ve şartları nelerdir?", answer: "Anlaşmalı boşanma için evliliğin en az 1 yıl sürmüş olması, eşlerin birlikte başvurması veya birinin açtığı davanın diğerince kabul edilmesi gerekir. Tarafların nafaka, velayet ve mal paylaşımı konularında mutabık kalması halinde genellikle tek celsede, 1-3 ay içinde sonuçlanır." },
            { question: "Velayet hakkı hangi kriterlere göre belirlenir?", answer: "Mahkeme velayet kararında çocuğun üstün yararını esas alır. Çocuğun yaşı, ebeveynlerin yaşam koşulları ve çocuğa ayırdıkları zaman, ekonomik durum, çocuğun görüşü (yeterli olgunlukta ise), pedagog ve sosyal hizmet uzmanı raporu değerlendirilir. 0-3 yaş arası çocuklarda kural olarak anne, büyük çocuklarda ise çocuğun görüşü ağırlıklıdır." },
            { question: "Nafaka türleri nelerdir ve ne kadar süre ödenir?", answer: "Türk hukukunda tedbir nafakası (dava süresince), iştirak nafakası (çocuk için, 18 yaşına veya eğitim bitene kadar), yoksulluk nafakası (boşanma sonrası geçim desteği, süresiz olabilir) ve yardım nafakası (alt-üstsoy arası) türleri vardır. Nafaka miktarı tarafların gelir durumu ve yaşam standartlarına göre hakim tarafından belirlenir." },
            { question: "Aile içi şiddette koruma kararı nasıl alınır?", answer: "6284 sayılı Kanun kapsamında aile içi şiddet, tehdit veya taciz mağduru kişi; savcılık, karakol, aile mahkemesi veya Alo 183 hattına başvurarak koruma kararı talep edebilir. Hakim, delil aramaksızın acil koruma kararı verebilir. Uzaklaştırma, barınma, maddi destek gibi tedbirler uygulanabilir." },
            { question: "Evlat edinme şartları nelerdir?", answer: "Evlat edinmek isteyen kişinin en az 30 yaşında olması, evli çiftlerin en az 5 yıldır evli olmaları veya her ikisinin de 30 yaşını doldurmuş olması gerekir. Küçüğü evlat edinmede çocuğun en az 1 yıl bakılmış ve eğitilmiş olması, evlat edinmenin çocuğun yararına olması şarttır." },
            { question: "Boşanmada mal paylaşımı nasıl yapılır?", answer: "Türk hukukunda 2002 sonrası evliliklerde yasal mal rejimi 'edinilmiş mallara katılma' rejimidir. Evlilik süresince edinilen mallar (maaş, yatırım gelirleri, edinilen taşınmazlar) eşit paylaşılır. Kişisel mallar (miras, bağış, kişisel eşyalar) ise paylaşım dışında kalır. Eşin katkı payı alacağı da ayrıca hesaplanır." },
        ],
        whyUsTitle: "Aile Hukuku Davalarında Neden Taş Hukuk?",
        whyUs: [
            { title: "Kapsamlı Aile Hukuku Deneyimi", description: "Boşanmadan velayete, nafakadan koruma kararlarına kadar aile hukukunun tüm alanlarında yılların deneyimine sahibiz. Her dosyaya özel strateji geliştiriyoruz." },
            { title: "Gizlilik ve Hassasiyet Güvencesi", description: "Aile hukuku davalarının kişisel niteliğini biliyor, mutlak gizlilik ilkesiyle çalışıyoruz. Özel hayatınıza ilişkin tüm bilgiler korunur." },
            { title: "Çocuğun Üstün Yararı Odağı", description: "Velayet, kişisel ilişki ve koruma kararı süreçlerinde her zaman çocukların psikolojik ve fiziksel güvenliğini ön planda tutuyoruz." },
            { title: "Uzlaşmacı ve Kararlı Yaklaşım", description: "Anlaşma mümkünse uzlaşı yolunu tercih ediyor, gerektiğinde ise mahkemede güçlü ve kararlı bir duruş sergiliyoruz." },
        ],
        ctaTitle: "Aile Hukuku Süreçlerinizde Yanınızdayız",
        ctaDescription: "Boşanma, velayet, nafaka, koruma kararı veya evlat edinme süreçlerinizde haklarınızı korumak için hemen bizimle iletişime geçin.",
    },

    "ceza-hukuku": {
        title: "Ceza Hukuku",
        slug: "ceza-hukuku",
        metaDescription:
            "İzmir ceza avukatı | Ceza davalarında müdafilik, suç duyurusu, tutukluluk işlemleri ve temyiz başvurularında uzman hukuki destek. Taş Hukuk & Danışmanlık.",
        keywords: ["izmir ceza avukatı", "ceza davası", "müdafi", "suç duyurusu", "tutuklama", "temyiz", "ceza hukuku uzmanı"],
        heroSummary:
            "Ceza davalarında savunma hakkınızı en güçlü şekilde kullanmanız için deneyimli ceza avukatlarımızla yanınızdayız. Soruşturma aşamasından yargılama sürecine kadar her adımda profesyonel müdafilik hizmeti sunuyoruz.",
        trustBadge: "İzmir'de uzman ceza avukatı desteği",
        whatIsTitle: "Ceza Hukuku Nedir?",
        whatIsContent: [
            "Ceza hukuku, suç olarak tanımlanan eylemleri, bu eylemlere uygulanacak yaptırımları ve ceza yargılaması sürecini düzenleyen hukuk dalıdır. 5237 sayılı Türk Ceza Kanunu ve 5271 sayılı Ceza Muhakemesi Kanunu, Türk ceza hukuku sisteminin temel mevzuatlarını oluşturur.",
            "Ceza hukuku, bireylerin özgürlük ve güvenlik haklarını doğrudan etkileyen en kritik hukuk alanlarından biridir. Bir ceza soruşturması veya kovuşturmasıyla karşılaşan kişinin, sürecin en başından itibaren uzman bir ceza avukatıyla çalışması, savunma hakkının etkin kullanılması için elzemdir.",
            "Ceza davalarında delil değerlendirmesi, tanık sorgulaması, tutukluluk itirazları ve yargılama stratejisi gibi teknik konular, deneyimli bir hukuki temsil olmaksızın kişinin aleyhine sonuçlanabilir. Bu nedenle ceza hukuku alanında uzmanlaşmış bir avukatla çalışmak, adil yargılanma hakkınızın teminatıdır.",
        ],
        servicesTitle: "Ceza Hukukunda Sunduğumuz Hizmetler",
        services: [
            { name: "Ceza Davalarında Müdafilik", description: "Soruşturma ve kovuşturma aşamalarında sanık veya şüpheli müdafiliği ile etkin savunma hizmeti." },
            { name: "Suç Duyurusu ve Şikayet", description: "Mağdur veya müşteki sıfatıyla savcılığa suç duyurusu ve şikayet dilekçesi hazırlama." },
            { name: "Tutukluluk İtirazları", description: "Tutuklama kararlarına itiraz, adli kontrol talepleri ve tahliye başvurularının yönetimi." },
            { name: "Uzlaşma ve Arabuluculuk", description: "Uzlaşmaya tabi suçlarda müzakere yönetimi ve uzlaşma protokolü hazırlama." },
            { name: "Temyiz ve İstinaf Başvuruları", description: "Hukuka aykırı kararların üst mahkemelerde denetlenmesi için kanun yolu başvuruları." },
            { name: "Bilişim ve Siber Suçlar", description: "İnternet üzerinden işlenen suçlar, veri ihlali ve dijital delil yönetiminde hukuki destek." },
        ],
        processTitle: "Ceza Davası Süreci Nasıl İşler?",
        processSteps: [
            { step: "Soruşturma Aşaması", detail: "Savcılık tarafından yürütülen soruşturmada şüpheli haklarının korunması, ifade alma sürecinde müdafilik." },
            { step: "İddianame Değerlendirmesi", detail: "Savcılık iddianamesinin hukuki açıdan detaylı incelenmesi ve savunma stratejisinin belirlenmesi." },
            { step: "Delil Analizi", detail: "Dosyadaki tüm delillerin (dijital, fiziksel, tanık) incelenmesi ve savunmaya yönelik karşı delil hazırlanması." },
            { step: "Duruşma Hazırlığı", detail: "Savunma makamı olarak duruşma planının oluşturulması, tanıkların hazırlanması." },
            { step: "Yargılama", detail: "Mahkeme huzurunda etkin savunma yapılması, tanık çapraz sorguları ve mütalaaya cevap." },
            { step: "Kanun Yolları", detail: "Gerekli görülmesi halinde istinaf ve temyiz başvurularının hazırlanması ve takibi." },
        ],
        faqTitle: "Ceza Hukuku Hakkında Sıkça Sorulan Sorular",
        faqs: [
            { question: "Gözaltına alındığımda avukat çağırma hakkım var mı?", answer: "Evet, Anayasa ve CMK gereği gözaltına alınan her kişi derhal avukat talep etme hakkına sahiptir. Müdafi olmaksızın gözaltında verilen ifadeler mahkemede delil olarak kullanılamaz. Bu hak, savunmanın en temel güvencesidir." },
            { question: "Tutukluluk süresi ne kadardır?", answer: "Ağır ceza mahkemesinin görevine girmeyen suçlarda tutukluluk süresi en fazla 1 yıldır. Ağır ceza mahkemesinde ise 2 yıl olup, zorunlu hallerde 1 yıl daha uzatılabilir. Terör suçlarında bu süreler daha uzundur." },
            { question: "Hükmün açıklanmasının geri bırakılması (HAGB) nedir?", answer: "HAGB, sanığa verilen cezanın belirli bir denetim süresi boyunca uygulanmamasıdır. 2 yıl veya daha az hapis cezalarında, sanığın daha önce kasıtlı suçtan mahkum olmamış olması ve zararın giderilmesi şartıyla uygulanabilir." },
            { question: "Uzlaşma nedir, hangi suçlarda uygulanır?", answer: "Uzlaşma, mağdur ve şüpheli/sanığın bir arabulucu yardımıyla anlaşmaya varmasıdır. Tehdit, basit yaralama, hakaret gibi şikâyete bağlı suçlarda ve bazı özel suçlarda zorunlu olarak uygulanır." },
            { question: "Adli sicil kaydı nasıl silinir?", answer: "Adli sicil kaydı, cezanın infaz edilmesinden veya düşmesinden itibaren belirli sürelerin geçmesiyle Adli Sicil ve İstatistik Genel Müdürlüğü tarafından arşive alınır. HAGB kararları ise denetim süresinin dolmasıyla otomatik olarak silinir." },
        ],
        whyUsTitle: "Ceza Davalarında Neden Taş Hukuk?",
        whyUs: [
            { title: "Savunma Odaklı Yaklaşım", description: "Her ceza dosyasında sanığın masumiyet karinesini esas alarak güçlü ve etkin savunma stratejileri geliştiriyoruz." },
            { title: "Hızlı Müdahale", description: "Gözaltı ve tutuklama durumlarında 7/24 ulaşılabilir avukat desteği sağlıyoruz." },
            { title: "Gizlilik Güvencesi", description: "Ceza soruşturma ve kovuşturma süreçlerinde müvekkil bilgilerinin mutlak gizliliğini sağlıyoruz." },
            { title: "Uzman Kadro", description: "Ceza hukuku alanında uzmanlaşmış avukatlarımızla karmaşık davalarda bile güçlü temsil sunuyoruz." },
        ],
        ctaTitle: "Ceza Davalarında Haklarınızı Koruyun",
        ctaDescription: "Savunma hakkınız için uzman ceza avukatlarımızla hemen görüşme talep edin.",
    },

    "miras-hukuku": {
        title: "Miras Hukuku",
        slug: "miras-hukuku",
        metaDescription:
            "İzmir miras avukatı | Miras paylaşımı, vasiyetname, tenkis davası, muris muvazaası ve mirasçılık belgesi işlemlerinde uzman hukuki destek. Taş Hukuk & Danışmanlık.",
        keywords: ["izmir miras avukatı", "miras davası", "vasiyetname", "tenkis davası", "miras paylaşımı", "muris muvazaası", "mirasçılık belgesi"],
        heroSummary:
            "Miras hukukundan kaynaklanan uyuşmazlıkları adil ve hızlı şekilde çözmek için stratejik hukuki destek sunuyoruz. Miras paylaşımından vasiyetname düzenlemeye, tenkis davalarından muris muvazaasına kadar tüm süreçlerde yanınızdayız.",
        trustBadge: "İzmir'de uzman miras avukatı desteği",
        whatIsTitle: "Miras Hukuku Nedir?",
        whatIsContent: [
            "Miras hukuku, bir kişinin ölümü veya gaipliğine karar verilmesi halinde malvarlığının (terekenin) yasal veya atanmış mirasçılara geçişini düzenleyen hukuk dalıdır. Türk Medeni Kanunu'nun 495-682. maddeleri kapsamında düzenlenir.",
            "Miras hukuku kapsamında yasal mirasçılık, saklı pay hakları, vasiyetname türleri (resmi, el yazılı, sözlü), miras sözleşmeleri ve ölüme bağlı tasarruflar gibi konular ele alınır. Türk hukukunda yasal mirasçılar; altsoy, anne-baba ve onların altsoyu, büyükanne-büyükbaba ve eş olarak sınıflandırılır.",
            "Miras uyuşmazlıkları genellikle aile içi ilişkileri zorlayan, duygusal ve hukuki açıdan karmaşık süreçlerdir. Saklı pay ihlalleri, muris muvazaası iddiaları ve terekenin belirlenmesi gibi konularda uzman bir miras avukatıyla çalışmak, haklarınızın tam olarak korunması için büyük önem taşır.",
        ],
        servicesTitle: "Miras Hukukunda Sunduğumuz Hizmetler",
        services: [
            { name: "Miras Paylaşımı ve Taksim Davaları", description: "Mirasçılar arasında anlaşmazlık halinde yasal miras paylaşımının sağlanması." },
            { name: "Vasiyetname Düzenleme ve İptali", description: "Resmi, el yazılı ve sözlü vasiyetname hazırlama; hukuka aykırı vasiyetnamelerin iptali." },
            { name: "Tenkis Davaları", description: "Saklı pay haklarının ihlal edildiği durumlarda payın tamamlanması davası." },
            { name: "Muris Muvazaası Davaları", description: "Miras bırakanın sağlığında gerçekleştirdiği muvazaalı devirlerin iptali." },
            { name: "Mirasçılık Belgesi İşlemleri", description: "Sulh hukuk mahkemesinden veya noterden mirasçılık belgesi alınması." },
            { name: "Mirastan Feragat ve Red", description: "Mirasın reddi, feragat sözleşmeleri ve borçlu terekelerde mirasçıların korunması." },
        ],
        processTitle: "Miras Davası Süreci Nasıl İşler?",
        processSteps: [
            { step: "Tereke Tespiti", detail: "Miras bırakanın tüm malvarlığının (taşınır, taşınmaz, banka hesapları, borçlar) kapsamlı tespiti." },
            { step: "Mirasçı Belirleme", detail: "Yasal ve atanmış mirasçıların tespiti, mirasçılık belgesinin alınması." },
            { step: "Hukuki Değerlendirme", detail: "Vasiyetname, miras sözleşmesi veya muvazaa iddialarının hukuki analizi." },
            { step: "Dava veya Uzlaşma", detail: "Mirasçılar arası anlaşma sağlanması veya gerekli davaların açılması." },
            { step: "Yargılama Süreci", detail: "Mahkemede delil sunumu, tanık dinletilmesi ve bilirkişi raporlarının değerlendirilmesi." },
            { step: "Karar ve Tescil", detail: "Mahkeme kararının kesinleşmesi ve tapu, banka gibi kurumlarda tescil işlemlerinin tamamlanması." },
        ],
        faqTitle: "Miras Hukuku Hakkında Sıkça Sorulan Sorular",
        faqs: [
            { question: "Mirası reddetmek için süre ne kadardır?", answer: "Mirasın reddi için yasal süre, mirasçının ölümü öğrenmesinden itibaren 3 aydır. Bu süre hak düşürücü niteliktedir, süresinde başvurmayanlar mirası kabul etmiş sayılır." },
            { question: "Saklı pay nedir ve kimler hak sahibidir?", answer: "Saklı pay, mirasçının yasal miras payının belirli bir oranıdır ve miras bırakanın tasarruflarıyla kaldırılamaz. Altsoy, anne-baba ve sağ kalan eş saklı pay hakkına sahiptir." },
            { question: "Muris muvazaası davasında zamanaşımı var mı?", answer: "Muris muvazaası davası, tapu iptali ve tescil davasıdır; ayni hakka dayandığı için zamanaşımına tabi değildir. Miras bırakanın vefatından sonra her zaman açılabilir." },
            { question: "Vasiyetname nasıl iptal edilir?", answer: "Vasiyetname; ehliyetsizlik, irade sakatlığı, şekle aykırılık veya hukuka ve ahlaka aykırılık nedenlerinden biriyle iptal davası açılarak iptal edilebilir. Dava süresi, vasiyetnamenin öğrenilmesinden itibaren 1 yıldır." },
            { question: "Miras paylaşımı zorunlu mu?", answer: "Mirasçılar birlikte mülkiyet sürdürebilir, ancak her mirasçı paylaşım talep etme hakkına sahiptir. Anlaşma sağlanamadığında ortaklığın giderilmesi davası açılabilir." },
        ],
        whyUsTitle: "Miras Davalarında Neden Taş Hukuk?",
        whyUs: [
            { title: "Kapsamlı Tereke Analizi", description: "Modern araştırma yöntemleriyle miras bırakanın tüm malvarlığını eksiksiz tespit ediyoruz." },
            { title: "Aile İçi Hassasiyet", description: "Miras süreçlerinin aile ilişkilerine etkisini gözeterek uzlaşmacı ve profesyonel yaklaşım benimsiyoruz." },
            { title: "Stratejik Dava Yönetimi", description: "Her miras dosyasında kişiye özel strateji geliştirerek en hızlı ve adil sonuca ulaşıyoruz." },
            { title: "Güncel İçtihat Takibi", description: "Yargıtay ve istinaf kararlarını yakından takip ederek savunma stratejilerimizi güçlendiriyoruz." },
        ],
        ctaTitle: "Miras Haklarınızı Koruyun",
        ctaDescription: "Miras uyuşmazlıklarında uzman avukatlarımızla hemen görüşme talep edin.",
    },

    "is-hukuku": {
        title: "İş Hukuku",
        slug: "is-hukuku",
        metaDescription:
            "İzmir iş hukuku avukatı | İşe iade, kıdem tazminatı, ihbar tazminatı, iş kazası ve mobbing davalarında uzman hukuki destek. Taş Hukuk & Danışmanlık.",
        keywords: ["izmir iş avukatı", "iş hukuku", "kıdem tazminatı", "ihbar tazminatı", "işe iade", "iş kazası", "mobbing"],
        heroSummary:
            "İşçi ve işveren haklarının korunmasında uzmanlaşmış ekibimizle, iş hukukundan kaynaklanan tüm uyuşmazlıklarda stratejik hukuki destek sunuyoruz. Tazminat davalarından işe iadeye kadar haklarınız güvencemiz altında.",
        trustBadge: "İzmir'de uzman iş hukuku avukatı desteği",
        whatIsTitle: "İş Hukuku Nedir?",
        whatIsContent: [
            "İş hukuku, işçi ile işveren arasındaki çalışma ilişkisini düzenleyen, tarafların hak ve yükümlülüklerini belirleyen hukuk dalıdır. 4857 sayılı İş Kanunu, 6331 sayılı İş Sağlığı ve Güvenliği Kanunu ve ilgili mevzuat kapsamında işçi hakları, çalışma koşulları ve iş güvencesi düzenlenir.",
            "İş hukuku; iş sözleşmesinin kurulmasından sona ermesine, ücret haklarından iş güvenliğine, sendika haklarından toplu iş sözleşmelerine kadar geniş bir alanı kapsar. İşten çıkarılma, tazminat talepleri, fazla mesai alacakları ve iş kazaları bu alanın en sık karşılaşılan uyuşmazlıklarıdır.",
            "İş hukuku uyuşmazlıklarında arabuluculuk dava şartı olarak belirlenmiştir. İşe iade, kıdem-ihbar tazminatı ve ücret alacağı gibi taleplerde önce arabuluculuğa başvurulması zorunludur. Bu süreçte uzman bir iş hukuku avukatıyla çalışmak, haklarınızın tam olarak korunması için kritik öneme sahiptir.",
        ],
        servicesTitle: "İş Hukukunda Sunduğumuz Hizmetler",
        services: [
            { name: "Kıdem ve İhbar Tazminatı Davaları", description: "Haksız fesih halinde kıdem tazminatı, ihbar tazminatı ve kötüniyet tazminatı taleplerinin takibi." },
            { name: "İşe İade Davaları", description: "Geçersiz feshe karşı işe iade talebi, boşta geçen süre ücreti ve işe başlatmama tazminatı." },
            { name: "İş Kazası ve Meslek Hastalığı", description: "İş kazası tazminat davaları, SGK rücu davaları ve maluliyet tespiti süreçleri." },
            { name: "Mobbing (Psikolojik Taciz) Davaları", description: "İşyerinde psikolojik taciz tespiti, delil yönetimi ve tazminat talepleri." },
            { name: "Fazla Mesai ve Ücret Alacakları", description: "Ödenmeyen ücretler, fazla mesai, yıllık izin, ulusal bayram ve genel tatil alacakları." },
            { name: "İş Sözleşmesi Hazırlama", description: "Belirli-belirsiz süreli iş sözleşmeleri, rekabet yasağı ve gizlilik sözleşmeleri hazırlama." },
        ],
        processTitle: "İş Hukuku Davası Süreci Nasıl İşler?",
        processSteps: [
            { step: "Durum Analizi", detail: "İş ilişkisinin niteliği, fesih şekli ve taleplerinizin hukuki değerlendirmesi." },
            { step: "Zorunlu Arabuluculuk", detail: "Dava şartı olan arabuluculuk sürecinde müzakere ve uzlaşma desteği." },
            { step: "Dava Hazırlığı", detail: "Delil toplama, tanık tespiti ve dava dilekçesinin hazırlanması." },
            { step: "Bilirkişi İncelemesi", detail: "Tazminat hesaplama, iş güvenliği raporu ve kusur oranı tespiti." },
            { step: "Duruşma Süreci", detail: "Mahkeme huzurunda etkin temsil, tanık dinletme ve bilirkişi raporuna itiraz." },
            { step: "İcra Takibi", detail: "Kesinleşen kararın uygulanması için icra takibi başlatılması." },
        ],
        faqTitle: "İş Hukuku Hakkında Sıkça Sorulan Sorular",
        faqs: [
            { question: "Kıdem tazminatı hakkım var mı?", answer: "En az 1 yıl çalışmış olmanız ve iş sözleşmenizin kıdem tazminatına hak kazanacak şekilde sona ermesi gerekir. İstifa eden işçi kural olarak kıdem tazminatı alamaz, ancak haklı fesih halleri (ücret ödenmemesi, mobbing vb.) bu kuralın istisnasıdır." },
            { question: "İşe iade davası açma süresi ne kadardır?", answer: "İşe iade davası açmak için fesih bildiriminin tebliğinden itibaren 1 ay içinde arabulucuya başvurmanız gerekir. Arabuluculukta anlaşma sağlanamazsa, son tutanağın düzenlenmesinden itibaren 2 hafta içinde dava açılmalıdır." },
            { question: "İş kazası halinde hangi haklarım var?", answer: "İş kazası geçiren işçi; tedavi giderlerinin karşılanmasını, geçici iş göremezlik ödeneği, sürekli iş göremezlik geliri ve işverenden maddi-manevi tazminat talep etme hakkına sahiptir. Ölümlü iş kazalarında destekten yoksun kalma tazminatı talep edilebilir." },
            { question: "Arabuluculuk zorunlu mu?", answer: "Evet, iş hukuku uyuşmazlıklarında dava açmadan önce arabuluculuğa başvurmak yasal zorunluluktur. Arabuluculuk sürecinde anlaşma sağlanamazsa dava yoluna gidilebilir. Arabuluculuk süreci genellikle 3 hafta içinde sonuçlanır." },
            { question: "Fazla mesai ücreti nasıl hesaplanır?", answer: "Haftalık 45 saati aşan çalışmalar fazla mesai sayılır. Fazla mesai ücreti, normal saat ücretinin %50 zamlı halidir. İşveren yazılı belge ile ispatlanamayan fazla mesaiyi ödemekle yükümlüdür." },
        ],
        whyUsTitle: "İş Davalarında Neden Taş Hukuk?",
        whyUs: [
            { title: "İş Hukuku Uzmanlığı", description: "İş hukuku alanındaki güncel mevzuat ve içtihat değişikliklerini yakından takip ederek müvekkillerimize en doğru yönlendirmeyi sağlıyoruz." },
            { title: "Arabuluculuk Deneyimi", description: "Zorunlu arabuluculuk sürecinde güçlü müzakere stratejileriyle en yüksek uzlaşma sonuçlarını elde ediyoruz." },
            { title: "İşçi ve İşveren Perspektifi", description: "Hem işçi hem işveren tarafında edindiğimiz deneyimle her iki perspektifi de anlıyor ve stratejik avantaj sağlıyoruz." },
            { title: "Hızlı Sonuç Odaklılık", description: "İş uyuşmazlıklarını mümkün olan en kısa sürede çözüme kavuşturarak müvekkillerimizin mağduriyetini önlüyoruz." },
        ],
        ctaTitle: "İş Hukuku Haklarınızı Koruyun",
        ctaDescription: "Tazminat, işe iade ve iş kazası davalarında uzman avukatlarımızla hemen görüşme talep edin.",
    },

    "ticaret-hukuku": {
        title: "Ticaret Hukuku",
        slug: "ticaret-hukuku",
        metaDescription:
            "İzmir ticaret hukuku avukatı | Şirket kuruluşu, ticari sözleşmeler, ortaklık uyuşmazlıkları, iflas ve konkordato davalarında uzman hukuki destek. Taş Hukuk & Danışmanlık.",
        keywords: ["izmir ticaret avukatı", "ticaret hukuku", "şirket kuruluşu", "ticari sözleşme", "ortaklık davası", "iflas", "konkordato", "ticari alacak"],
        heroSummary:
            "Ticari hayatınızı güvence altına alan kapsamlı hukuki danışmanlık ve dava takibi hizmeti sunuyoruz. Şirket kuruluşundan ticari sözleşmelere, ortaklık uyuşmazlıklarından iflas süreçlerine kadar işletmenizin yanındayız.",
        trustBadge: "İzmir'de uzman ticaret hukuku avukatı desteği",
        whatIsTitle: "Ticaret Hukuku Nedir?",
        whatIsContent: [
            "Ticaret hukuku, ticari faaliyetleri, tacirler arasındaki ilişkileri ve ticari işletmelerin kuruluş, işleyiş ve sona ermesini düzenleyen hukuk dalıdır. 6102 sayılı Türk Ticaret Kanunu bu alanın temel mevzuatını oluşturur ve şirketler hukuku, kıymetli evrak, taşıma, sigorta ve deniz ticareti gibi alt dalları kapsar.",
            "Ticaret hukuku; anonim şirket, limited şirket, kolektif ve komandit şirket gibi farklı şirket türlerinin kuruluşu, yönetimi ve tasfiyesini düzenler. Ticari sözleşmeler, haksız rekabet, marka ve patent hakları ile ticari alacak ve iflas davaları bu alanın en sık karşılaşılan konularıdır.",
            "Ticari uyuşmazlıklarda hızlı ve doğru müdahale, işletmenizin sürekliliği ve ticari itibarınızın korunması açısından kritik önem taşır. Şirket birleşme ve devir işlemlerinden ortaklık anlaşmazlıklarına, rekabet ihlallerinden iflas süreçlerine kadar uzman bir ticaret avukatıyla çalışmak, risklerinizi minimize eder.",
        ],
        servicesTitle: "Ticaret Hukukunda Sunduğumuz Hizmetler",
        services: [
            { name: "Şirket Kuruluşu ve Tür Değişikliği", description: "Anonim, limited ve diğer şirket türlerinin kuruluşu, ana sözleşme hazırlama ve tür değişikliği işlemleri." },
            { name: "Ticari Sözleşmeler", description: "Distribütörlük, franchise, bayilik, lisans ve her türlü ticari sözleşmenin hazırlanması ve incelenmesi." },
            { name: "Ortaklık Uyuşmazlıkları", description: "Ortaklar arası anlaşmazlıklar, hisse devri, ortaklıktan çıkma ve çıkarma davaları." },
            { name: "Ticari Alacak ve İcra Takibi", description: "Ticari alacakların icra yoluyla tahsili, itirazın iptali ve itirazın kaldırılması davaları." },
            { name: "İflas ve Konkordato", description: "İflas erteleme, konkordato başvurusu, alacaklılar toplantısı ve tasfiye süreçlerinin yönetimi." },
            { name: "Haksız Rekabet Davaları", description: "Ticari sırların korunması, yanıltıcı reklam ve haksız rekabet eylemlerine karşı hukuki mücadele." },
        ],
        processTitle: "Ticari Dava Süreci Nasıl İşler?",
        processSteps: [
            { step: "Ticari Analiz", detail: "İşletmenizin hukuki durumunun, sözleşme ilişkilerinin ve uyuşmazlık konusunun kapsamlı değerlendirilmesi." },
            { step: "Strateji Geliştirme", detail: "Dava, arabuluculuk veya müzakere yollarından hangisinin en uygun olduğunun belirlenmesi." },
            { step: "İhtar ve Müzakere", detail: "Karşı tarafa resmi ihtarname çekilmesi ve sulh olasılığının değerlendirilmesi." },
            { step: "Dava veya Arabuluculuk", detail: "Ticaret mahkemesinde dava açılması veya ticari arabuluculuk sürecinin yönetimi." },
            { step: "Bilirkişi İncelemesi", detail: "Mali müşavir ve sektör uzmanı bilirkişi raporlarının değerlendirilmesi." },
            { step: "Karar ve İcra", detail: "Mahkeme kararının kesinleştirilmesi ve alacağın icra yoluyla tahsil edilmesi." },
        ],
        faqTitle: "Ticaret Hukuku Hakkında Sıkça Sorulan Sorular",
        faqs: [
            { question: "Limited şirket mi anonim şirket mi kurmalıyım?", answer: "Limited şirket en az 10.000 TL sermaye ile kurulabilir ve daha az maliyetlidir. Anonim şirket en az 50.000 TL sermaye gerektirir ancak halka arz imkânı sunar. İşletmenizin büyüklüğüne, ortaklık yapısına ve hedeflerine göre en uygun türü birlikte belirleriz." },
            { question: "Ortağımla anlaşamıyorum, ne yapabilirim?", answer: "Ortaklık uyuşmazlıklarında öncelikle şirket sözleşmesindeki mekanizmalar devreye girer. Anlaşma sağlanamazsa haklı nedenle ortaklıktan çıkma veya çıkarma davası, şirketin feshi davası ya da hisse devri yoluyla çözüm aranabilir." },
            { question: "Konkordato nedir ve nasıl başvurulur?", answer: "Konkordato, borçlarını ödeyemeyen işletmelerin alacaklılarıyla anlaşarak borçlarını yeniden yapılandırmasıdır. Ticaret mahkemesine başvurularak geçici mühlet, kesin mühlet ve konkordato projesi aşamaları izlenir." },
            { question: "Ticari sözleşme ihlalinde ne yapılır?", answer: "Sözleşme ihlali halinde öncelikle karşı tarafa ihtarname çekilir. Müzakere sonuçsuz kalırsa sözleşmedeki tahkim veya yetkili mahkeme hükmüne göre dava açılır. Tazminat, cezai şart ve sözleşmenin feshi talep edilebilir." },
            { question: "Haksız rekabet davası açabilir miyim?", answer: "Rakibiniz yanıltıcı reklam, ticari sırlarınızı kullanma, müşterilerinizi kötüleme gibi eylemler gerçekleştiriyorsa haksız rekabet davası açabilirsiniz. Dava ile eylemin tespiti, durdurulması ve tazminat talep edilebilir." },
        ],
        whyUsTitle: "Ticari Davalarda Neden Taş Hukuk?",
        whyUs: [
            { title: "Ticari Tecrübe", description: "Farklı sektörlerdeki ticari uyuşmazlıklarda edindiğimiz deneyimle stratejik çözümler üretiyoruz." },
            { title: "Sözleşme Uzmanlığı", description: "Her türlü ticari sözleşmeyi titizlikle hazırlayarak ileride doğabilecek riskleri önlüyoruz." },
            { title: "Hızlı Müdahale", description: "Ticari uyuşmazlıklarda zaman kaybını önlemek için hızlı ve kararlı adımlar atıyoruz." },
            { title: "Bütüncül Danışmanlık", description: "Şirket hukuku, vergi ve ticaret alanlarını birlikte değerlendirerek kapsamlı çözüm sunuyoruz." },
        ],
        ctaTitle: "Ticari Haklarınızı Koruyun",
        ctaDescription: "Ticaret hukuku uyuşmazlıklarınızda uzman avukatlarımızla hemen görüşme talep edin.",
    },

    "gayrimenkul-hukuku": {
        title: "Gayrimenkul Hukuku",
        slug: "gayrimenkul-hukuku",
        metaDescription:
            "İzmir gayrimenkul avukatı | Tapu işlemleri, kira davaları, kamulaştırma, kat mülkiyeti ve imar uyuşmazlıklarında uzman hukuki destek. Taş Hukuk & Danışmanlık.",
        keywords: ["izmir gayrimenkul avukatı", "tapu davası", "kira davası", "tahliye davası", "kamulaştırma", "imar hukuku", "kat mülkiyeti"],
        heroSummary:
            "Gayrimenkul hukukundan kaynaklanan tüm uyuşmazlıklarda kapsamlı hukuki danışmanlık ve dava takibi hizmeti sunuyoruz. Tapu işlemlerinden kira davalarına, kamulaştırmadan imar sorunlarına kadar mülkiyet haklarınızı koruyoruz.",
        trustBadge: "İzmir'de uzman gayrimenkul avukatı desteği",
        whatIsTitle: "Gayrimenkul Hukuku Nedir?",
        whatIsContent: [
            "Gayrimenkul hukuku, taşınmaz mallar üzerindeki mülkiyet hakları, sınırlı ayni haklar, kira ilişkileri ve imar düzenlemelerini kapsayan hukuk dalıdır. Türk Medeni Kanunu, Borçlar Kanunu, İmar Kanunu ve Kat Mülkiyeti Kanunu bu alanın temel mevzuatlarını oluşturur.",
            "Gayrimenkul uyuşmazlıkları; tapu iptal ve tescil davaları, kira sözleşmesi anlaşmazlıkları, tahliye davaları, kamulaştırma bedel davaları, kat mülkiyeti sorunları ve imar planı itirazları gibi çok çeşitli konularda ortaya çıkar.",
            "Gayrimenkul işlemleri ve davaları, yüksek ekonomik değerleri ve karmaşık hukuki boyutları nedeniyle uzman bir gayrimenkul avukatının yönlendirmesini gerektirir. Tapu sicili incelemeleri, imar durumu araştırmaları ve sözleşme hazırlama aşamalarında profesyonel hukuki destek almak, olası riskleri minimize eder.",
        ],
        servicesTitle: "Gayrimenkul Hukukunda Sunduğumuz Hizmetler",
        services: [
            { name: "Tapu İptal ve Tescil Davaları", description: "Hukuka aykırı tapu kayıtlarının düzeltilmesi ve mülkiyet hakkının tescili." },
            { name: "Kira ve Tahliye Davaları", description: "Kira sözleşmesi uyuşmazlıkları, kira tespit davaları ve tahliye süreçlerinin yönetimi." },
            { name: "Kamulaştırma Davaları", description: "Kamulaştırma bedel artırımı davaları ve acele kamulaştırma itirazları." },
            { name: "Kat Mülkiyeti Uyuşmazlıkları", description: "Ortak alan kullanımı, aidat uyuşmazlıkları ve yönetim planı değişiklikleri." },
            { name: "İmar Hukuku", description: "İmar planı itirazları, yapı ruhsatı süreçleri ve imar barışı başvuruları." },
            { name: "Gayrimenkul Alım-Satım Danışmanlığı", description: "Tapu öncesi hukuki inceleme (due diligence), sözleşme hazırlama ve devir işlemleri." },
        ],
        processTitle: "Gayrimenkul Davası Süreci Nasıl İşler?",
        processSteps: [
            { step: "Tapu ve İmar Araştırması", detail: "Tapu kayıtları, imar durumu, ipotek ve şerh gibi takyidatların kapsamlı incelenmesi." },
            { step: "Hukuki Durum Değerlendirmesi", detail: "Uyuşmazlığın niteliğine göre dava türü ve strateji belirlenmesi." },
            { step: "İhtar ve Müzakere", detail: "Karşı tarafa resmi ihtar çekilmesi ve sulh olasılığının değerlendirilmesi." },
            { step: "Dava Açılması", detail: "Kapsamlı dilekçe hazırlığı, keşif ve bilirkişi taleplerinin sunulması." },
            { step: "Keşif ve Bilirkişi", detail: "Taşınmaz üzerinde keşif yapılması, imar mühendisi ve ekspertiz raporları." },
            { step: "Karar ve Tescil", detail: "Mahkeme kararının kesinleşmesi ve tapu müdürlüğünde tescil işlemleri." },
        ],
        faqTitle: "Gayrimenkul Hukuku Hakkında Sıkça Sorulan Sorular",
        faqs: [
            { question: "Tapu iptal davası hangi durumlarda açılır?", answer: "Tapu iptal davası; sahte vekaletname ile yapılan işlemler, muris muvazaası, hata-hile-ikrah nedeniyle yapılan satışlar, ehliyetsizlik ve imar mevzuatına aykırı tesciller gibi durumlarda açılabilir." },
            { question: "Kiracı tahliyesi ne kadar sürer?", answer: "Tahliye sürecinin uzunluğu nedene göre değişir. İhtiyaç nedeniyle tahliye davası 6-12 ay, temerrüt (ödemeyen kiracı) nedeniyle tahliye 3-6 ay, tahliye taahhüdüne dayalı icra 1-3 ay sürebilir." },
            { question: "Kamulaştırma bedeline itiraz edilebilir mi?", answer: "Evet, idarenin tespit ettiği bedeli düşük bulan malik, kamulaştırma işleminin tebliğinden itibaren 30 gün içinde kamulaştırma bedel artırımı davası açabilir. Mahkeme, bilirkişi incelemesi ile gerçek değeri belirlettir." },
            { question: "Alım-satım öncesi hangi kontroller yapılmalı?", answer: "Tapu kaydı, imar durumu, ipotek, haciz, şerh gibi takyidatlar, yapı ruhsatı ve iskan durumu, belediye borçları ve SGK prim borçları kontrol edilmelidir. Bu kapsamlı hukuki inceleme olası riskleri ortadan kaldırır." },
            { question: "Kat mülkiyeti sorunlarında ne yapılabilir?", answer: "Ortak alan ihlalleri, aidat ödememeleri ve yönetim planına aykırı kullanımlarda öncelikle yöneticiye ve kat malikleri kuruluna başvurulur. Çözüm sağlanamazsa sulh hukuk mahkemesinde dava açılabilir." },
        ],
        whyUsTitle: "Gayrimenkul Davalarında Neden Taş Hukuk?",
        whyUs: [
            { title: "Kapsamlı Due Diligence", description: "Gayrimenkul işlemlerinden önce tapu, imar, vergi ve hukuki durumu detaylı araştırıyoruz." },
            { title: "Yerel Piyasa Bilgisi", description: "İzmir gayrimenkul piyasasını yakından tanıyoruz, emsal değerleme ve bölgesel mevzuata hakimiz." },
            { title: "Çok Yönlü Uzmanlık", description: "Tapu, imar, kira ve kat mülkiyeti alanlarında bütüncül hukuki destek sunuyoruz." },
            { title: "Proaktif Risk Yönetimi", description: "Yatırım ve alım-satım süreçlerinde olası riskleri önceden belirleyerek müvekkillerimizi koruyoruz." },
        ],
        ctaTitle: "Mülkiyet Haklarınızı Güvence Altına Alın",
        ctaDescription: "Gayrimenkul uyuşmazlıklarınızda uzman avukatlarımızla hemen görüşme talep edin.",
    },
}

export const ALL_SLUGS = Object.keys(PRACTICE_AREAS_TR)
