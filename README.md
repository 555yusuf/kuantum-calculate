# Kapsamlı Backend Teknik Spesifikasyon Dokümanı (Comprehensive API & Backend Specification Document)

Bu doküman, Frontend Geliştiricisinin backend'de tek bir satır bile kod değiştirmesine gerek kalmadan bu projeyle çalışabilmesi ve arayüzleri bağlayabilmesi için eksiksiz ve detaylı bir başvuru rehberi sunmaktadır. Sistemin tüm davranışları, girdi ve çıktı veri yapıları, sabitler ve istisnai durumlar burada en ince ayrıntısına kadar açıklanmıştır.

---

## 1. Sistem Genel Bakış (System Overview)

### Projenin Ana Fikri

Bu proje, **küresel şirketlerin hisse senetleri üzerine bir finansal simülasyon ve analiz sistemidir**. Sistem kullanıcılara şu olanakları sağlar:

1. Hesap oluşturma ve güvenli giriş yapma.
2. Hisse senetlerinin günlük geçmiş fiyatlarını getirme.
3. Tek seferlik yatırım (Lump Sum Investment) performansını hesaplama; alış ve satış değerlerini karşılaştırarak net kâr/zararı ve Yatırım Getirisi (ROI) oranını çıkarma.
4. Belirli bir zaman aralığındaki en yüksek ve en düşük kapanış fiyatlarını bularak yatırım için en iyi ve en kötü günleri belirleme (Piyasa Zamanlaması - Market Timing).
5. Aylık sabit bir tutarla Düzenli Alım Stratejisi (Dolar Maliyet Ortalaması - DCA) simülasyonu yapma, portföy özetini ve aylık bazda detaylı dökümleri görüntüleme.

### Backend'de Kullanılan Teknolojiler

* **Temel Ortam**: Web sunucusu ve API hizmetlerini mini bir MVC mimarisiyle inşa etmek için Node.js ve Express framework.
* **Veritabanı**: Şemaları ve modelleri oluşturmak için Mongoose tabanlı MongoDB.
* **Veri Doğrulama**: Verileri servislere veya veritabanına göndermeden önce katı bir şekilde denetlemek için Joi ve Joi-Password-Complexity.
* **Dış Bağlantılar**: Global veri sağlayıcısı **Tiingo API** üzerinden gerçek ve geçmiş hisse senedi verilerini çekmek için Axios.
* **Şifreleme ve Güvenlik**: Veritabanındaki parolaları hash'lemek için bcryptjs.
* **Kimlik Doğrulama Sistemi**: Kayıtlı kullanıcılara doğrulama token'ı üretmek için jsonwebtoken (JWT).

---

## 2. Veritabanı Şemaları ve Modelleri (Data Models & Schemas)

Sistemde bir adet veritabanı depolama modeli (User Model) ve desteklenen şirket sembollerini (Company Symbols) doğrulamak için sabit bir veri yapısı bulunmaktadır.

### Birincisi: Kullanıcı Modeli (User Model)

*[User.model.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/models/User.model.js) dosyasında tanımlanmıştır.*

Kullanıcı verileri aşağıdaki yapıya göre kaydedilir:

| Alan Adı (Field) | Veri Tipi (Type) | Zorunlu mu? (Required) | Varsayılan Değer (Default) | Doğrulama Kuralları ve Alan Şartları (Validation Rules) |
| --- | --- | --- | --- | --- |
| `_id` | `ObjectId` | Evet (Otomatik) | Otomatik | MongoDB tarafından oluşturulan benzersiz kullanıcı kimliği. |
| `email` | `String` | Evet | Yok | Benzersiz (`unique`) e-posta adresi; başındaki ve sonundaki boşluklar otomatik olarak silinir (`trim`). |
| `username` | `String` | Evet | Yok | Benzersiz (`unique`) kullanıcı adı; boşluklar silinir (`trim`), Minimum uzunluk: 1 karakter, Maksimum: 200 karakter. |
| `password` | `String` | Evet | Yok | Bcrypt ile hash'lenmiş parola, Minimum uzunluk: 8 karakter. |
| `age` | `String` | Evet | Yok | Kullanıcının yaşı (metin/String olarak saklanır). |
| `createdAt` | `Date` | Evet (Otomatik) | Oluşturulma Tarihi | Hesabın oluşturulduğu tarih (`timestamps: true` sayesinde otomatik eklenir). |
| `updatedAt` | `Date` | Evet (Otomatik) | Güncellenme Tarihi | Verilerin son güncellendiği tarih (`timestamps: true` sayesinde otomatik eklenir). |

---

## 3. Kimlik Doğrulama ve Yetkilendirme (Authentication & Authorization)

### Kimlik Doğrulama Nasıl Çalışır?

Sistemdeki kimlik doğrulama işlemi **JWT (JSON Web Token)** üzerinden gerçekleştirilir. Yeni bir hesap oluşturulduğunda veya başarıyla giriş yapıldığında, sunucu kullanıcının benzersiz kimliğini (`id`) içeren ve `.env` dosyasında saklanan `JWT_SECRET_KEY` adlı gizli anahtarla imzalanmış bir token üretir.

### Frontend Token'ı Nereye Göndermeli?

> [!IMPORTANT]
> Lütfen bu projede token'ın gönderim şekline çok dikkat edin. Token, yaygın olan `Authorization: Bearer <token>` formatında **GÖNDERİLMEZ**; doğrudan istek başlıklarında (**HTTP Headers**) özel olarak tanımlanmış **`token`** adlı bir alanın içine yerleştirilerek gönderilir.
> İstek başlığı örneği (HTTP Header):
> ```http
> token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDBmZTRmNTMxMTIzNjE2OGExMDljYSIsImlhdCI6MTYyNDM2NDYwMH0...
> 
> ```
> 
> 

### Roller ve Erişim Kontrolü (Roles & Access Control)

Sistemde yetkileri kontrol etmek için [verifyToken.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/middlewares/verifyToken.js) adında bir Middleware (ara katman) dosyası bulunur ve şu yetkilendirme kurallarını içerir:

1. **Genel Token Doğrulaması (`verifyToken`)**:
* `token` header'ının varlığını ve geçerliliğini kontrol eder.
* Doğrulama başarılı olursa token'ı çözümler, kullanıcı bilgilerini `req.user` olarak isteğe ekler ve bir sonraki adıma (`next()`) geçer.
* Başarısız olursa veya header bulunmazsa `401 Unauthorized` hatası döndürür.


2. **Hesap Sahibi veya Admin Doğrulaması (`verifyTokenAndAuthorization`)**:
* Önce kullanıcının kimliğini doğrulamak için `verifyToken`ı çalıştırır.
* Token içindeki ID (`req.user.id`) ile istek URL'indeki ID'yi (`req.params.id`) karşılaştırır veya kullanıcının admin olup olmadığına (`req.user.isAdmin === true`) bakar.
* İki şarttan biri sağlanırsa isteğin geçmesine izin verilir. Aksi takdirde `"You are not allowed"` mesajıyla `403 Forbidden` hatası döndürür.


3. **Yalnızca Admin Doğrulaması (`verifyTokenAndAdmin`)**:
* Önce `verifyToken`ı çalıştırır.
* Kullanıcının admin olup olmadığını (`req.user.isAdmin === true`) kontrol eder.
* Admin değilse, `"You are not allowed ,only admin allowed"` mesajıyla `403 Forbidden` hatası döndürür.



> [!WARNING]
> **Kritik Teknik Not**:
> Kodun mevcut sürümünde, **bu Middleware'ler projenin aktif uç noktalarının (routes) hiçbirinde devreye alınmamıştır** ([users.routes.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/routes/users.routes.js) ve [asset.routes.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/routes/asset.routes.js) dosyaları). Dolayısıyla, şu anki tüm rotalar varsayılan olarak **herkese açıktır (Public)**, ancak middleware ilgili rotaya eklendiği an çalışacak şekilde kod altyapısı hazırdır.
> Ayrıca, veritabanındaki **`UserSchema` içinde `isAdmin` adında bir alan bulunmamaktadır**. Bu durum, admin kontrolü yapan middleware kullanıldığında, veritabanına manuel olarak enjekte edilmediği veya model sonradan güncellenmediği sürece sorgunun varsayılan olarak başarısız olacağı anlamına gelir.

---

## 4. Uç Nokta (Endpoint) Detay Matrisi (The API Matrix)

Projede bulunan 7 rotanın (Routes) tam ve detaylı teknik özellikleri aşağıdadır:

---

### [1] Tüm Kullanıcı Listesini Getirme

* **Rota ve Metod**: `GET /api/users`
* **İşlev**: Sistemde kayıtlı tüm kullanıcıların verilerini içeren eksiksiz bir dizi (array) getirir.
* **Koruma Durumu**: Herkese Açık (Public).
* **Gerekli Veriler (Request Payload)**: Body, params veya query parametresi gerektirmez.
* **Başarılı Yanıt Yapısı (Success Response 202 Accepted)**:
* Kod: `202`
* JSON Formatı:
```json
[
  {
    "_id": "6676ba5cc97b4f5352c349e1",
    "email": "user1@example.com",
    "username": "financial_user",
    "password": "$2a$10$xyzT... (Not: Parola hash'i de döndürülmektedir)",
    "age": "30",
    "createdAt": "2026-06-22T12:30:20.123Z",
    "updatedAt": "2026-06-22T12:30:20.123Z",
    "__v": 0
  },
  {
    "_id": "6676ba5cc97b4f5352c349e2",
    "email": "user2@example.com",
    "username": "investor_pro",
    "password": "$2a$10$abcD... (Not: Parola hash'i de döndürülmektedir)",
    "age": "25",
    "createdAt": "2026-06-22T12:31:00.456Z",
    "updatedAt": "2026-06-22T12:31:00.456Z",
    "__v": 0
  }
]

```




* **Hata Yanıtı Yapısı (Error Response 5xx/4xx)**:
Veritabanı bağlantı sorunlarında standart sunucu hatası döndürür.

---

### [2] Yeni Kullanıcı Kaydı (Register)

* **Rota ve Metod**: `POST /api/users/register`
* **İşlev**: Yeni bir kullanıcı belgesi oluşturur, parolayı hash'ler ve ona bir kimlik doğrulama token'ı üretir.
* **Koruma Durumu**: Herkese Açık (Public).
* **Gerekli Veriler (Request Payload)**:
JSON Gövdesi (Request Body):
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "StrongPassword123!",
  "age": "28"
}

```


* **Joi ile Doğrulama Kuralları (Validation Rules)**:
* `email`: String, zorunlu, geçerli e-posta formatı, trim uygulanır.
* `username`: String, zorunlu, boşluk barındıramaz, uzunluğu 1 ile 200 karakter arasında olmalıdır.
* `password`: Zorunlu. Parola karmaşıklığı kurallarına (Joi-Password-Complexity) tabidir: en az 1 büyük harf, 1 küçük harf, 1 rakam, 1 özel karakter içermeli ve minimum 8 karakter olmalıdır.
* `age`: String, zorunlu.




* **Başarılı Yanıt Yapısı (Success Response 201 Created)**:
* Kod: `201`
* JSON Formatı:
```json
{
  "message": "İşlem başarılı",
  "success": true,
  "data": {
    "_id": "6676ba5cc97b4f5352c349e1",
    "email": "user@example.com",
    "username": "johndoe",
    "age": "28",
    "createdAt": "2026-06-22T12:55:00.000Z",
    "updatedAt": "2026-06-22T12:55:00.000Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzZiYTVjYzk3YjRmNTM1MmMzNDllMSIsImlhdCI6MTc4MjE0OTMwMH0..."
  }
}

```




* **Hata Yanıtı Yapısı (Error Response 400 Bad Request)**:
* Girdi doğrulama hatası (Joi Validation Error) durumunda backend, hatayı bir JSON objesi olarak değil, **doğrudan düz string (JSON String Literal)** olarak döndürür:
```json
"\"email\" must be a valid email"

```


* E-posta daha önce kayıtlıysa:
```json
"kullanici daha once kayit yapmistir"

```


* Kullanıcı adı daha önce alınmışsa:
```json
"lutfen baska bir kullanici adi kullaniniz "

```





---

### [3] Kullanıcı Girişi (Login)

* **Rota ve Metod**: `POST /api/users/login`
* **İşlev**: Giriş bilgilerinin doğruluğunu kontrol eder ve kullanıcıya yetkilendirme token'ı tahsis eder.
* **Koruma Durumu**: Herkese Açık (Public).
* **Gerekli Veriler (Request Payload)**:
JSON Gövdesi:
```json
{
  "email": "user@example.com",
  "password": "StrongPassword123!"
}

```


* **Joi ile Doğrulama Kuralları**:
* `email`: String, zorunlu, geçerli e-posta formatı, trim uygulanır.
* `password`: String, zorunlu, trim uygulanır.




* **Başarılı Yanıt Yapısı (Success Response 200 OK)**:
* Kod: `200`
* JSON Formatı:
```json
{
  "message": "İşlem başarılı",
  "success": true,
  "data": {
    "_id": "6676ba5cc97b4f5352c349e1",
    "email": "user@example.com",
    "username": "johndoe",
    "age": "28",
    "createdAt": "2026-06-22T12:55:00.000Z",
    "updatedAt": "2026-06-22T12:55:00.000Z",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NzZiYTVjYzk3YjRmNTM1MmMzNDllMSIsImlhdCI6MTc4MjE0OTMwMH0..."
  }
}

```




* **Hata Yanıtı Yapısı (Error Response 400 Bad Request)**:
* Joi doğrulama hatası durumunda **düz JSON string'i** döner:
```json
"\"password\" is required"

```


* Veritabanında e-posta bulunamazsa:
```json
"Kullanici epostasi yanlistir "

```


* Parola eşleşmezse:
```json
"Kullanici  sifresi yanlistir "

```





---

### [4] Hisse Senedi Geçmiş Fiyat Listesini Getirme (Historical Prices)

* **Rota ve Metod**: `POST /api/company/prices`
* **İşlev**: Belirtilen iki tarih arasında, belirli bir şirkete ait günlük kapanış fiyatlarını Tiingo API üzerinden çeker.
* **Koruma Durumu**: Herkese Açık (Public).
* **Gerekli Veriler (Request Payload)**:
JSON Gövdesi:
```json
{
  "sDate": "2026-01-01",
  "eDate": "2026-01-10",
  "symbol": "AAPL"
}

```


* **Joi ile Doğrulama Kuralları**:
* `sDate`: Geçerli tarih, zorunlu.
* `eDate`: Geçerli tarih, zorunlu.
* `symbol`: String, zorunlu. **Yalnızca desteklenen semboller listesinden biri olmalıdır** (`companySymbol` dizisinde tanımlananlar).




* **Başarılı Yanıt Yapısı (Success Response 200 OK)**:
* Kod: `200`
* Filtrelenmiş tarih ve kapanış fiyatlarını içeren obje dizisi:
```json
[
  {
    "tarih": "2026-01-02",
    "kapanisFiyati": 179.25
  },
  {
    "tarih": "2026-01-05",
    "kapanisFiyati": 181.12
  },
  {
    "tarih": "2026-01-06",
    "kapanisFiyati": 180.5
  }
]

```




* **Hata Yanıtı Yapısı (Error Response 400 Bad Request)**:
* Doğrulama başarısız olduğunda düz metin döner:
```json
"\"symbol\" must be one of [AAPL, MSFT, GOOGL, ...]"

```





---

### [5] Tek Seferlik Yatırım Performansı Simülasyonu (Lump Sum Investment)

* **Rota ve Metod**: `POST /api/company/amount`
* **İşlev**: Alım tarihinde (`buyDate`) yatırılan bir tutarın, satış tarihinde (`saleDate`) tamamen satılması durumunda elde edilecek güncel varlık değerini, kâr/zararı ve ROI oranını hesaplar.
* **Koruma Durumu**: Herkese Açık (Public).
* **Gerekli Veriler (Request Payload)**:
JSON Gövdesi:
```json
{
  "buyDate": "2026-01-05",
  "saleDate": "2026-01-09",
  "amount": 5000,
  "symbol": "MSFT"
}

```


* **Joi ile Doğrulama Kuralları**:
* `buyDate`: Geçerli tarih, zorunlu. **Hafta sonuna (Cumartesi veya Pazar) denk gelmemelidir.**
* `saleDate`: Geçerli tarih, zorunlu. **Hafta sonuna (Cumartesi veya Pazar) denk gelmemelidir.**
* `amount`: Sayı (Number), zorunlu (yatırılan ana para).
* `symbol`: String, zorunlu, desteklenen semboller listesinden olmalı.




* **Başarılı Yanıt Yapısı (Success Response 200 OK)**:
* Kod: `200`
* JSON Formatı:
```json
{
  "success": true,
  "data": {
    "yatirilanTutar": 5000,
    "guncelDeger": 5345.2,
    "netKarZarar": 345.2,
    "getiriOrani": "6.9%"
  }
}

```




* **Hata Yanıtı Yapısı (Error Response 400 Bad Request)**:
* Joi doğrulaması başarısız olduğunda veya tarihlerden biri hafta sonuna denk geldiğinde, sistem `message` alanına sahip standart bir JSON objesi döndürür:
* **Doğrulama hatası örneği**:
```json
{
  "message": "\"amount\" is required"
}

```


* **Hafta sonuna denk gelme hatası örneği**:
```json
{
  "message": "Girdiginiz tarih 2026-01-04 hafta sonuna denk gelmektedir lütfen değiştiriniz "
}

```







---

### [6] Piyasa Zamanlaması Analizi (Market Timing Analysis)

* **Rota ve Metod**: `POST /api/company/timing`
* **İşlev**: Belirli bir zaman aralığındaki hisse senedi verilerini tarayarak ulaştığı en yüksek fiyatı/tarihini ve en düşük fiyatı/tarihini tespit eder.
* **Koruma Durumu**: Herkese Açık (Public).
* **Gerekli Veriler (Request Payload)**:
JSON Gövdesi:
```json
{
  "sDate": "2026-01-01",
  "eDate": "2026-01-30",
  "symbol": "GOOGL"
}

```


* **Joi ile Doğrulama Kuralları**:
* `sDate`: Geçerli tarih, zorunlu.
* `eDate`: Geçerli tarih, zorunlu.
* `symbol`: String, zorunlu, desteklenen semboller listesinden olmalı.




* **Başarılı Yanıt Yapısı (Success Response 200 OK)**:
* Kod: `200`
* JSON Formatı:
```json
{
  "enYuksek": {
    "fiyat": 152.43,
    "tarih": "2026-01-15"
  },
  "enDusuk": {
    "fiyat": 140.12,
    "tarih": "2026-01-05"
  }
}

```




* **Hata Yanıtı Yapısı (Error Response 400 Bad Request)**:
* Doğrulama hatasında düz JSON string döner:
```json
"\"sDate\" is required"

```





---

### [7] Düzenli Alım (DCA) Stratejisi Simülasyonu (Dollar Cost Averaging)

* **Rota ve Metod**: `POST /api/company/dca`
* **İşlev**: İki tarih arasında her ay sabit bir tutarın (verilerde o aya ait görünen ilk işlem gününde) düzenli olarak yatırılması durumundaki yatırım performansını hesaplar.
* **Koruma Durumu**: Herkese Açık (Public).
* **Gerekli Veriler (Request Payload)**:
JSON Gövdesi:
```json
{
  "sDate": "2025-01-01",
  "eDate": "2025-12-31",
  "amount": 200,
  "symbol": "AAPL"
}

```


* **Joi ile Doğrulama Kuralları**:
* `sDate`: Geçerli tarih, zorunlu.
* `eDate`: Geçerli tarih, zorunlu.
* `amount`: Sayı (Number), zorunlu (aylık yatırılan miktar).
* `symbol`: String, zorunlu, desteklenen semboller listesinden olmalı.




* **Başarılı Yanıt Yapısı (Success Response 200 OK)**:
* Kod: `200`
* JSON Formatı:
```json
{
  "ozet": {
    "toplamYatirilanTutar": 2400,
    "guncelPortfoyDegeri": 2743.68,
    "netKarZarar": 343.68,
    "getiriOrani": "%14.32",
    "toplamHisseAdedi": 15.2004,
    "sonHisseFiyati": 180.5
  },
  "islemSayisi": 12,
  "aylikDetaylar": [
    {
      "tarih": "2025-01-02",
      "fiyat": 172.5,
      "alinanAdet": 1.1594,
      "toplamHisse": 1.1594,
      "toplamMaliyet": 200
    },
    {
      "tarih": "2025-02-03",
      "fiyat": 175.2,
      "alinanAdet": 1.1416,
      "toplamHisse": 2.301,
      "toplamMaliyet": 400
    }
  ]
}

```




* **Hata Yanıtı Yapısı (Backend'de Beklenmeyen Davranış - Lütfen "Kritik İpuçları" Bölümünü Okuyun)**:
> [!CAUTION]
> **Frontend Geliştiricisi İçin Çok Önemli Uyarı**:
> Bu spesifik uç noktada bir doğrulama hatası (Joi) veya harici Tiingo sunucusuyla bir bağlantı problemi yaşandığında; servis ile controller arasındaki bir hata yakalama uyuşmazlığı nedeniyle, **backend 400 hata kodu veya açıklayıcı bir mesaj fırlatmak yerine gövdesi boş (Empty JSON / Null / Undefined) bir `200 OK` yanıtı döndürür.**
> Frontend tarafı gelen yanıtı mutlaka denetlemelidir: Gelen obje boşsa veya içinde `ozet` anahtarı yoksa, istek başarısız sayılmalı ve kullanıcıya arayüzde bir hata mesajı gösterilmelidir.



---

## 5. Sistem Sabitleri ve Tanımlı Değerler (Enums & Global Constants)

Sistemde, işlem yapmak, fiyat sorgulamak ve portföy simülasyonları oluşturmak için desteklenen şirket sembollerinin listesini barındıran iki temel dizi bulunmaktadır.

*Kaynak: [companySymbol.models.js*](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/models/companySymbol.models.js)

### Tam Desteklenen Şirketler ve Sembolleri

`companySymbolAndName` dizisi, sembol (`sembol`) ve şirketin İngilizce tam adından (`isim`) oluşan şu objeleri barındırır:

```json
[
  { "sembol": "AAPL", "isim": "Apple Inc." },
  { "sembol": "MSFT", "isim": "Microsoft Corporation" },
  { "sembol": "GOOGL", "isim": "Alphabet Inc." },
  { "sembol": "AMZN", "isim": "Amazon.com Inc." },
  { "sembol": "META", "isim": "Meta Platforms Inc." },
  { "sembol": "NVDA", "isim": "NVIDIA Corporation" },
  { "sembol": "TSLA", "isim": "Tesla Inc." },
  { "sembol": "HPQ", "isim": "HP Inc." },
  { "sembol": "JNJ", "isim": "Johnson & Johnson" },
  { "sembol": "V", "isim": "Visa Inc." },
  { "sembol": "WMT", "isim": "Walmart Inc." },
  { "sembol": "JPM", "isim": "JPMorgan Chase & Co." },
  { "sembol": "PG", "isim": "The Procter & Gamble Company" },
  { "sembol": "MA", "isim": "Mastercard Incorporated" },
  { "sembol": "UNH", "isim": "UnitedHealth Group Incorporated" },
  { "sembol": "DIS", "isim": "The Walt Disney Company" },
  { "sembol": "HD", "isim": "The Home Depot Inc." },
  { "sembol": "BAC", "isim": "Bank of America Corporation" },
  { "sembol": "XOM", "isim": "Exxon Mobil Corporation" },
  { "sembol": "CVX", "isim": "Chevron Corporation" },
  { "sembol": "KO", "isim": "The Coca-Cola Company" },
  { "sembol": "PEP", "isim": "PepsiCo Inc." },
  { "sembol": "COST", "isim": "Costco Wholesale Corporation" },
  { "sembol": "PFE", "isim": "Pfizer Inc." },
  { "sembol": "MRK", "isim": "Merck & Co. Inc." },
  { "sembol": "TMO", "isim": "Thermo Fisher Scientific Inc." },
  { "sembol": "MCD", "isim": "McDonald's Corporation" },
  { "sembol": "CRM", "isim": "Salesforce Inc." },
  { "sembol": "CSCO", "isim": "Cisco Systems Inc." },
  { "sembol": "ABT", "isim": "Abbott Laboratories" },
  { "sembol": "ACN", "isim": "Accenture plc" },
  { "sembol": "NFLX", "isim": "Netflix Inc." },
  { "sembol": "ADBE", "isim": "Adobe Inc." },
  { "sembol": "INTC", "isim": "Intel Corporation" },
  { "sembol": "AMD", "isim": "Advanced Micro Devices Inc." },
  { "sembol": "CMCSA", "isim": "Comcast Corporation" },
  { "sembol": "NKE", "isim": "NIKE Inc." },
  { "sembol": "TXN", "isim": "Texas Instruments Incorporated" },
  { "sembol": "PM", "isim": "Philip Morris International Inc." },
  { "sembol": "LIN", "isim": "Linde plc" },
  { "sembol": "NEE", "isim": "NextEra Energy Inc." },
  { "sembol": "UNP", "isim": "Union Pacific Corporation" },
  { "sembol": "ORCL", "isim": "Oracle Corporation" },
  { "sembol": "WFC", "isim": "Wells Fargo & Company" },
  { "sembol": "QCOM", "isim": "QUALCOMM Incorporated" },
  { "sembol": "HON", "isim": "Honeywell International Inc." },
  { "sembol": "UPS", "isim": "United Parcel Service Inc." },
  { "sembol": "RTX", "isim": "RTX Corporation" },
  { "sembol": "BA", "isim": "The Boeing Company" },
  { "sembol": "IBM", "isim": "International Business Machines Corporation" },
  { "sembol": "LLY", "isim": "Eli Lilly and Company" },
  { "sembol": "SBUX", "isim": "Starbucks Corporation" },
  { "sembol": "GE", "isim": "General Electric Company" },
  { "sembol": "CAT", "isim": "Caterpillar Inc." },
  { "sembol": "GS", "isim": "The Goldman Sachs Group Inc." },
  { "sembol": "MS", "isim": "Morgan Stanley" },
  { "sembol": "BLK", "isim": "BlackRock Inc." },
  { "sembol": "MMM", "isim": "3M Company" },
  { "sembol": "C", "isim": "Citigroup Inc." },
  { "sembol": "AXP", "isim": "American Express Company" },
  { "sembol": "T", "isim": "AT&T Inc." },
  { "sembol": "VZ", "isim": "Verizon Communications Inc." },
  { "sembol": "F", "isim": "Ford Motor Company" },
  { "sembol": "GM", "isim": "General Motors Company" },
  { "sembol": "TGT", "isim": "Target Corporation" },
  { "sembol": "LOW", "isim": "Lowe's Companies Inc." },
  { "sembol": "CVS", "isim": "CVS Health Corporation" },
  { "sembol": "WBA", "isim": "Walgreens Boots Alliance Inc." },
  { "sembol": "BMY", "isim": "Bristol-Myers Squibb Company" },
  { "sembol": "GILD", "isim": "Gilead Sciences Inc." },
  { "sembol": "AMGN", "isim": "Amgen Inc." },
  { "sembol": "ISRG", "isim": "Intuitive Surgical Inc." },
  { "sembol": "MDT", "isim": "Medtronic plc" },
  { "sembol": "SYK", "isim": "Stryker Corporation" },
  { "sembol": "SPGI", "isim": "S&P Global Inc." },
  { "sembol": "INTU", "isim": "Intuit Inc." },
  { "sembol": "NOW", "isim": "ServiceNow Inc." },
  { "sembol": "PYPL", "isim": "PayPal Holdings Inc." },
  { "sembol": "SQ", "isim": "Block Inc." },
  { "sembol": "UBER", "isim": "Uber Technologies Inc." },
  { "sembol": "ABNB", "isim": "Airbnb Inc." },
  { "sembol": "SNOW", "isim": "Snowflake Inc." },
  { "sembol": "PLTR", "isim": "Palantir Technologies Inc." },
  { "sembol": "ROKU", "isim": "Roku Inc." },
  { "sembol": "ZM", "isim": "Zoom Video Communications Inc." },
  { "sembol": "DOCU", "isim": "DocuSign Inc." },
  { "sembol": "SPOT", "isim": "Spotify Technology S.A." },
  { "sembol": "SHOP", "isim": "Shopify Inc." },
  { "sembol": "CRWD", "isim": "CrowdStrike Holdings Inc." },
  { "sembol": "NET", "isim": "Cloudflare Inc." },
  { "sembol": "DDOG", "isim": "Datadog Inc." },
  { "sembol": "TEAM", "isim": "Atlassian Corporation" },
  { "sembol": "OKTA", "isim": "Okta Inc." },
  { "sembol": "ZS", "isim": "Zscaler Inc." },
  { "sembol": "PANW", "isim": "Palo Alto Networks Inc." },
  { "sembol": "FTNT", "isim": "Fortinet Inc." },
  { "sembol": "LMT", "isim": "Lockheed Martin Corporation" },
  { "sembol": "NOC", "isim": "Northrop Grumman Corporation" },
  { "sembol": "GD", "isim": "General Dynamics Corporation" },
  { "sembol": "DE", "isim": "Deere & Company" },
  { "sembol": "WM", "isim": "Waste Management Inc." }
]

```

---

## 6. Frontend Geliştiricisi İçin Kritik İpuçları ve İstisnai Durumlar (Gotchas & Edge Cases)

Arayüzün çökmesini veya kullanıcıya anlamsız hatalar yansımasını önlemek için Frontend geliştiricisinin aşağıdaki senaryolara tam anlamıyla dikkat etmesi gerekir:

1. **Token Aktarım Yöntemi**:
Token'ın `Authorization` başlığında bir Bearer token olarak değil, Header içerisinde doğrudan `token` adıyla gönderilmesi gerektiğini asla unutmayın.
2. **Tarih Formatı ve Günlük Filtreleme**:
Backend, tarihleri `YYYY-MM-DD` formatında (veya JavaScript Date objesinin kabul ettiği herhangi bir formatta) kabul eder. Hisse senedi yanıtlarını işlerken `YYYY-MM-DD` formatında göstermek için metni `"T"` harfinden bölerek yalnızca ilk kısmını alır.
3. **Hafta Sonları (Weekends)**:
Borsalar Cumartesi ve Pazar günleri kapalıdır. Bu yüzden:
* `/api/company/amount` (Lump Sum) rotası alış ve satış tarihlerini denetler; bunlardan biri Cumartesi veya Pazar gününe denk gelirse istek anında başarısız olur ve 400 hata kodu döner.
* Frontend tarafı, sunucu hatalarını sıfıra indirmek ve kusursuz bir deneyim sunmak adına, arayüzdeki tarih seçiciyi (Date Picker) kullanıcının Cumartesi ve Pazar günlerini seçemeyeceği şekilde kısıtlamalıdır.


4. **DCA Alım Zamanlaması**:
DCA algoritması, Tiingo'dan gelen geçmiş veri akışında her ayın görünen ilk işlem gününde hisse alımı yapar. Simülasyon sonunda toplam portföy değerini bulmak için, satın alınan toplam hisse adedini belirtilen tarih aralığının son gününün kapanış fiyatıyla çarpar.
5. **Kullanıcı Listesinde Parola Hash'inin Görünmesi**:
`GET /api/users` rotası, parola hash'i (`password`) dahil olmak üzere tüm kullanıcı verilerini döndürür. Güvenlik gerekçesiyle bu alan arayüzde kesinlikle hiçbir yerde ekrana basılmamalıdır.
6. **DCA Rotasına Özgü Hata Davranışı**:
`POST /api/company/dca` rotasında bir hata meydana geldiğinde (o döneme ait veri bulunamaması, harici Tiingo API anahtarı sorunu veya Joi doğrulama hatası fark etmeksizin), backend açıklayıcı bir 400 hatası vermek yerine **boş bir gövdeyle `200 OK**` döndürür.
*Frontend tarafındaki çözüm:* Yanıtı okumaya çalışmadan önce her zaman ana `ozet` objesinin var olup olmadığını kontrol edin; yoksa isteği başarısız kabul edip kullanıcıya uygun bir uyarı verin.
7. **Düz Metin (String) Hata Mesajı Yapıları**:
Çoğu rota, doğrulama başarısız olduğunda veya bir hata oluştuğunda alıştığımız `{ "message": "..." }` objesi yerine **ham JSON metni (Raw JSON String)** döndürür. Bunun tek istisnası, düzenli bir hata objesi `{ "message": "..." }` döndüren Lump Sum (`/api/company/amount`) rotasıdır.
*Frontend tarafındaki çözüm:* Hata yanıtları esnek bir şekilde işlenmelidir (hata bir string ise doğrudan kendisi okunmalı, bir obje ise `message` özelliği kontrol edilmelidir).
8. **Tiingo API Anahtarı Bağımlılığı**:
Tüm hisse senedi fonksiyonları tamamen ortam değişkenlerindeki `TIINGO_API_KEY` değerine bağlıdır. Ücretsiz kullanım limitinin dolması veya anahtarın yanlış yapılandırılması durumunda tüm `/api/company/*` rotaları patlayacak ve hata (genellikle 500 veya boş yanıt) döndürecektir.
