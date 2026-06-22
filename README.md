# وثيقة المواصفات التقنية الشاملة للباك إند (Comprehensive API & Backend Specification Document)

تُقدم هذه الوثيقة دليلاً مرجعياً كاملاً وتفصيلياً لمطور واجهات المستخدم (Frontend Developer) للتعامل مع هذا المشروع وربطه بالواجهات دون الحاجة لتعديل سطر واحد في الباك إند. جميع سلوكيات النظام، الهياكل البيانية للمدخلات والمخرجات، الثوابت، والحالات الخاصة مشروحة هنا بالتفصيل الممل.

---

## 1. نظرة عامة على النظام (System Overview)

### فكرة المشروع الرئيسية
المشروع عبارة عن **نظام محاكاة وتحليل مالي للاستثمارات في أسهم الشركات العالمية**. يتيح النظام للمستخدمين:
1. تسجيل الحسابات وتسجيل الدخول الآمن.
2. جلب الأسعار التاريخية اليومية للأسهم.
3. حساب أداء الاستثمار دفعة واحدة (Lump Sum Investment) ومقارنة قيمة الشراء بقيمة البيع واستخراج صافي الربح/الخسارة ومعدل العائد الاستثماري (ROI).
4. تحديد أفضل وأسوأ الأيام للاستثمار (توقيت السوق - Market Timing) عبر استخراج أعلى وأدنى سعر إغلاق سهم خلال فترة محددة.
5. محاكاة استراتيجية الاستثمار الدوري بمبلغ ثابت شهرياً (Dollar Cost Averaging - DCA) واستعراض ملخص المحفظة والتفاصيل الشهرية المفصلة.

### التقنيات المستخدمة في الباك إند
- **البيئة الأساسية**: Node.js مع إطار عمل Express لبناء خادم الويب وخدمات الـ API بنمط معماري MVC مصغر.
- **قاعدة البيانات**: MongoDB بالاعتماد على Mongoose لبناء النماذج والجداول.
- **التحقق من البيانات**: Joi و Joi-Password-Complexity للتحقق من المدخلات بشكل صارم قبل إرسالها إلى الخدمات أو قاعدة البيانات.
- **الاتصال الخارجي**: Axios لجلب بيانات الأسهم الحقيقية والتاريخية من مزود البيانات العالمي **Tiingo API**.
- **التشفير والحماية**: bcryptjs لتشفير كلمات المرور داخل قاعدة البيانات.
- **نظام المصادقة**: jsonwebtoken (JWT) لإصدار توكن التحقق للمستخدمين المسجلين.

---

## 2. مخطط قواعد البيانات والنماذج (Data Models & Schemas)

يحتوي النظام على نموذج تخزين واحد في قاعدة البيانات (User Model)، بالإضافة إلى هيكل بيانات ثابت للتحقق من رموز الشركات المدعومة (Company Symbols).

### أولاً: نموذج المستخدم (User Model)
*تم تعريفه في الملف [User.model.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/models/User.model.js)*

يتم حفظ بيانات المستخدمين وفقاً للهيكل التالي:

| اسم الحقل (Field) | نوع البيانات (Type) | إجباري (Required) | القيمة الافتراضية (Default) | قيود التحقق وشروط الحقل (Validation Rules) |
| :--- | :--- | :--- | :--- | :--- |
| `_id` | `ObjectId` | نعم (تلقائي) | تلقائي | معرف فريد مميز للمستخدم يتم إنشاؤه بواسطة MongoDB. |
| `email` | `String` | نعم | لا يوجد | بريد إلكتروني فريد (`unique`)، يتم إزالة المسافات الزائدة منه تلقائياً (`trim`). |
| `username` | `String` | نعم | لا يوجد | اسم مستخدم فريد (`unique`)، إزالة المسافات الزائدة (`trim`)، الطول الأدنى: 1 حرف، الأقصى: 200 حرف. |
| `password` | `String` | نعم | لا يوجد | كلمة مرور مشفرة بـ Bcrypt، الطول الأدنى: 8 أحرف. |
| `age` | `String` | نعم | لا يوجد | عمر المستخدم (مخزن كـ نص String). |
| `createdAt` | `Date` | نعم (تلقائي) | تاريخ الإنشاء | تاريخ إنشاء الحساب (مضاف تلقائياً بفضل `timestamps: true`). |
| `updatedAt` | `Date` | نعم (تلقائي) | تاريخ التحديث | تاريخ آخر تحديث للبيانات (مضاف تلقائياً بفضل `timestamps: true`). |

---

## 3. نظام المصادقة والصلاحيات (Authentication & Authorization)

### طريقة عمل المصادقة
تتم عملية المصادقة في النظام عبر توكن الويب من نوع **JWT (JSON Web Token)**. عند تسجيل حساب جديد أو تسجيل الدخول بنجاح، يقوم السيرفر بتوليد توكن يحتوي على معرف المستخدم الفريد (`id`) وتوقيعه باستخدام المفتاح السري المسمى `JWT_SECRET_KEY` المخزن في ملف البيئة `.env`.

### أين يرسل الفرونت إند التوكن؟
> [!IMPORTANT]
> يرجى الانتباه الشديد لطريقة إرسال التوكن في هذا المشروع. لا يتم إرسال التوكن بصيغة `Authorization: Bearer <token>` الشائعة، بل يتم إرساله **مباشرة في ترويسات الطلب (HTTP Headers)** تحت حقل مخصص يسمى **`token`**.
>
> مثال على ترويسة الطلب:
> ```http
> token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZDBmZTRmNTMxMTIzNjE2OGExMDljYSIsImlhdCI6MTYyNDM2NDYwMH0...
> ```

### الأدوار والتحقق من الصلاحيات (Roles & Access Control)
يحتوي النظام على ملف وسيط (Middleware) للتحقق من الصلاحيات وهو [verifyToken.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/middlewares/verifyToken.js) ويحتوي على الصلاحيات التالية:

1. **التحقق من التوكن العام (`verifyToken`)**:
   - يتحقق من وجود الهيدر `token` وصحته.
   - في حال نجاح التحقق، يقوم بفك تشفير التوكن وإرفاق بيانات المستخدم بطلب الخدمة كـ `req.user` ثم ينتقل للخطوة التالية (`next()`).
   - في حال الفشل أو عدم وجود الهيدر، يرجع استجابة خطأ `401 Unauthorized`.

2. **التحقق من صاحب الحساب أو الأدمن (`verifyTokenAndAuthorization`)**:
   - ينفذ `verifyToken` أولاً للتأكد من هوية المستخدم.
   - يقارن المعرّف الموجود في التوكن (`req.user.id`) بالمعرّف الممرر في مسار الطلب (`req.params.id`). أو يتحقق مما إذا كان المستخدم مديراً (`req.user.isAdmin` تساوي `true`).
   - إذا تحقق أحد الشرطين، يتم السماح بمرور الطلب. خلاف ذلك، يرجع خطأ `403 Forbidden` برسالة `"You are not allowed"`.

3. **التحقق من الأدمن فقط (`verifyTokenAndAdmin`)**:
   - ينفذ `verifyToken` أولاً.
   - يتحقق مما إذا كان المستخدم مديراً (`req.user.isAdmin` تساوي `true`).
   - إذا لم يكن مديراً، يرجع خطأ `403 Forbidden` برسالة `"You are not allowed ,only admin allowed"`.

> [!WARNING]
> **ملاحظة تقنية حرجة**:
> في النسخة الحالية من الكود، **لم يتم تفعيل هذه البرمجيات الوسيطة (Middlewares) على أي مسار من مسارات المشروع النشطة** (الملفات [users.routes.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/routes/users.routes.js) و [asset.routes.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/routes/asset.routes.js)). بالتالي، تعتبر جميع المسارات الحالية **عامة (Public)** حالياً، ولكن الكود جاهز لتفعيلها بمجرد إرفاق الميدل وير للمسار المعني.
>
> كذلِك، **لا يوجد حقل `isAdmin` داخل الـ `UserSchema`** في قاعدة البيانات، مما يعني أنه في حال استخدام الميدل وير للتحقق من الأدمن، سيفشل الشرط بشكل افتراضي لعدم وجود القيمة في مستند المستخدم ما لم يتم حقنها يدوياً في قاعدة البيانات أو تعديل الموديل لاحقاً.

---

## 4. جدول تفاصيل الـ Endpoints (The API Matrix)

فيما يلي المواصفات التفصيلية الكاملة لجميع المسارات السبعة (7 Routes) المتوفرة في المشروع:

---

### [1] جلب قائمة جميع المستخدمين
* **المسار والطريقة**: `GET /api/users`
* **الوظيفة**: جلب مصفوفة كاملة تحتوي على بيانات جميع المستخدمين المسجلين في النظام.
* **حالة الحماية**: عام (Public).
* **البيانات المطلوبة (Request Payload)**: لا يوجد مدخلات في الـ body أو الـ params أو الـ query.
* **شكل الاستجابة الناجحة (Success Response 202 Accepted)**:
  * الرمز: `202`
  * شكل الاستجابة (JSON):
    ```json
    [
      {
        "_id": "6676ba5cc97b4f5352c349e1",
        "email": "user1@example.com",
        "username": "financial_user",
        "password": "$2a$10$xyzT... (ملاحظة: شفرة الباسورد يتم إرجاعها)",
        "age": "30",
        "createdAt": "2026-06-22T12:30:20.123Z",
        "updatedAt": "2026-06-22T12:30:20.123Z",
        "__v": 0
      },
      {
        "_id": "6676ba5cc97b4f5352c349e2",
        "email": "user2@example.com",
        "username": "investor_pro",
        "password": "$2a$10$abcD... (ملاحظة: شفرة الباسورد يتم إرجاعها)",
        "age": "25",
        "createdAt": "2026-06-22T12:31:00.456Z",
        "updatedAt": "2026-06-22T12:31:00.456Z",
        "__v": 0
      }
    ]
    ```
* **شكل استجابة الخطأ (Error Response 5xx/4xx)**:
  يرجع خطأ السيرفر القياسي في حال وجود مشاكل في الاتصال بقاعدة البيانات.

---

### [2] تسجيل مستخدم جديد (Register)
* **المسار والطريقة**: `POST /api/users/register`
* **الوظيفة**: إنشاء مستند مستخدم جديد وتشفير كلمة المرور وتوليد توكن المصادقة له.
* **حالة الحماية**: عام (Public).
* **البيانات المطلوبة (Request Payload)**:
  يتم تمريرها في جسم الطلب (JSON Request Body):
  ```json
  {
    "email": "user@example.com",
    "username": "johndoe",
    "password": "StrongPassword123!",
    "age": "28"
  }
  ```
  * **شروط التحقق (Validation Rules) باستخدام Joi**:
    - `email`: نص، إجباري، صيغة بريد إلكتروني صحيحة، يتم عمل trim.
    - `username`: نص، إجباري، لا يحتوي على مسافات زائدة، طوله من 1 إلى 200 حرف.
    - `password`: إجباري، يتطلب تعقيد كلمة مرور (Joi-Password-Complexity) والذي يفرض وجود حرف كبير، حرف صغير، رقم، رمز خاص، وبطول لا يقل عن 8 أحرف.
    - `age`: نص، إجباري.
* **شكل الاستجابة الناجحة (Success Response 201 Created)**:
  * الرمز: `201`
  * شكل الاستجابة (JSON):
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
* **شكل استجابة الخطأ (Error Response 400 Bad Request)**:
  * في حال فشل التحقق من صحة المدخلات (Joi Validation Error)، يرجع الباك إند رسالة الخطأ كـ **نص صريح داخل الـ JSON (JSON String Literal)** وليس ككائن، على النحو التالي:
    ```json
    "\"email\" must be a valid email"
    ```
  * في حال كان البريد الإلكتروني مسجلاً مسبقاً:
    ```json
    "kullanici daha once kayit yapmistir"
    ```
  * في حال كان اسم المستخدم مسجلاً مسبقاً:
    ```json
    "lutfen baska bir kullanici adi kullaniniz "
    ```

---

### [3] تسجيل دخول المستخدم (Login)
* **المسار والطريقة**: `POST /api/users/login`
* **الوظيفة**: التحقق من صحة بيانات الدخول وإصدار توكن المصادقة للمستخدم.
* **حالة الحماية**: عام (Public).
* **البيانات المطلوبة (Request Payload)**:
  يتم تمريرها في جسم الطلب (JSON Request Body):
  ```json
  {
    "email": "user@example.com",
    "password": "StrongPassword123!"
  }
  ```
  * **شروط التحقق (Validation Rules) باستخدام Joi**:
    - `email`: نص، إجباري، صيغة بريد إلكتروني صحيحة، مع عمل trim.
    - `password`: نص، إجباري، مع عمل trim.
* **شكل الاستجابة الناجحة (Success Response 200 OK)**:
  * الرمز: `200`
  * شكل الاستجابة (JSON):
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
* **شكل استجابة الخطأ (Error Response 400 Bad Request)**:
  * في حال فشل التحقق من صحة المدخلات (Joi Validation Error)، يرجع الباك إند رسالة الخطأ كـ **نص صريح (JSON String)**:
    ```json
    "\"password\" is required"
    ```
  * في حال عدم العثور على البريد الإلكتروني في قاعدة البيانات:
    ```json
    "Kullanici epostasi yanlistir "
    ```
  * في حال كانت كلمة المرور غير صحيحة:
    ```json
    "Kullanici  sifresi yanlistir "
    ```

---

### [4] جلب قائمة الأسعار التاريخية للسهم (Historical Prices)
* **المسار والطريقة**: `POST /api/company/prices`
* **الوظيفة**: جلب أسعار الإغلاق اليومية لرمز شركة معين بين تاريخين محددين من الـ Tiingo API.
* **حالة الحماية**: عام (Public).
* **البيانات المطلوبة (Request Payload)**:
  يتم تمريرها في جسم الطلب (JSON Request Body):
  ```json
  {
    "sDate": "2026-01-01",
    "eDate": "2026-01-10",
    "symbol": "AAPL"
  }
  ```
  * **شروط التحقق (Validation Rules) باستخدام Joi**:
    - `sDate`: تاريخ صالح، إجباري.
    - `eDate`: تاريخ صالح، إجباري.
    - `symbol`: نص، إجباري، **ويجب أن يكون حصرياً من قائمة الرموز المدعومة** (المعرفة في مصفوفة `companySymbol`).
* **شكل الاستجابة الناجحة (Success Response 200 OK)**:
  * الرمز: `200`
  * شكل الاستجابة (JSON): مصفوفة من العناصر المحتوية على التاريخ وسعر الإغلاق بعد الفلترة:
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
* **شكل استجابة الخطأ (Error Response 400 Bad Request)**:
  * في حال فشل التحقق من صحة المدخلات (Joi Validation Error)، يرجع الباك إند رسالة الخطأ كـ **نص صريح (JSON String)**:
    ```json
    "\"symbol\" must be one of [AAPL, MSFT, GOOGL, ...]"
    ```

---

### [5] محاكاة أداء الاستثمار دفعة واحدة (Lump Sum Investment)
* **المسار والطريقة**: `POST /api/company/amount`
* **الوظيفة**: حساب قيمة الأصول والربح/الخسارة والعائد على الاستثمار لمبلغ تم استثماره في تاريخ الشراء `buyDate` وبيعه بالكامل في تاريخ البيع `saleDate`.
* **حالة الحماية**: عام (Public).
* **البيانات المطلوبة (Request Payload)**:
  يتم تمريرها في جسم الطلب (JSON Request Body):
  ```json
  {
    "buyDate": "2026-01-05",
    "saleDate": "2026-01-09",
    "amount": 5000,
    "symbol": "MSFT"
  }
  ```
  * **شروط التحقق (Validation Rules) باستخدام Joi**:
    - `buyDate`: تاريخ صالح، إجباري. **يجب ألا يقع في عطلة نهاية الأسبوع (السبت أو الأحد)**.
    - `saleDate`: تاريخ صالح، إجباري. **يجب ألا يقع في عطلة نهاية الأسبوع (السبت أو الأحد)**.
    - `amount`: رقم، إجباري (رأس المال المستثمر).
    - `symbol`: نص، إجباري، ويجب أن يكون حصرياً من قائمة الرموز المدعومة.
* **شكل الاستجابة الناجحة (Success Response 200 OK)**:
  * الرمز: `200`
  * شكل الاستجابة (JSON):
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
* **شكل استجابة الخطأ (Error Response 400 Bad Request)**:
  * في حال فشل التحقق من Joi أو عند تداخل تاريخ الشراء أو البيع مع عطلة نهاية أسبوع، يعيد النظام كائن JSON يحتوي على الحقل `message` كالتالي:
    - **مثال لخطأ التحقق**:
      ```json
      {
        "message": "\"amount\" is required"
      }
      ```
    - **مثال لخطأ مصادفة عطلة نهاية الأسبوع**:
      ```json
      {
        "message": "Girdiginiz tarih 2026-01-04 hafta sonuna denk gelmektedir lütfen değiştiriniz "
      }
      ```

---

### [6] تحليل توقيت السوق (Market Timing Analysis)
* **المسار والطريقة**: `POST /api/company/timing`
* **الوظيفة**: تحليل البيانات التاريخية لسهم خلال فترة معينة واستخراج أعلى سعر وصل له وتاريخه وأدنى سعر وتاريخه.
* **حالة الحماية**: عام (Public).
* **البيانات المطلوبة (Request Payload)**:
  يتم تمريرها في جسم الطلب (JSON Request Body):
  ```json
  {
    "sDate": "2026-01-01",
    "eDate": "2026-01-30",
    "symbol": "GOOGL"
  }
  ```
  * **شروط التحقق (Validation Rules) باستخدام Joi**:
    - `sDate`: تاريخ صالح، إجباري.
    - `eDate`: تاريخ صالح، إجباري.
    - `symbol`: نص، إجباري، ويجب أن يكون حصرياً من قائمة الرموز المدعومة.
* **شكل الاستجابة الناجحة (Success Response 200 OK)**:
  * الرمز: `200`
  * شكل الاستجابة (JSON):
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
* **شكل استجابة الخطأ (Error Response 400 Bad Request)**:
  * في حال فشل التحقق من صحة المدخلات (Joi Validation Error)، يرجع الباك إند رسالة الخطأ كـ **نص صريح (JSON String)**:
    ```json
    "\"sDate\" is required"
    ```

---

### [7] محاكاة الاستثمار الدوري (Dollar Cost Averaging - DCA)
* **المسار والطريقة**: `POST /api/company/dca`
* **الوظيفة**: حساب أداء الاستثمار الدوري لمبلغ ثابت يتم استثماره شهرياً (في بداية كل شهر تقويمي يظهر في البيانات) بين تاريخين محددين.
* **حالة الحماية**: عام (Public).
* **البيانات المطلوبة (Request Payload)**:
  يتم تمريرها في جسم الطلب (JSON Request Body):
  ```json
  {
    "sDate": "2025-01-01",
    "eDate": "2025-12-31",
    "amount": 200,
    "symbol": "AAPL"
  }
  ```
  * **شروط التحقق (Validation Rules) باستخدام Joi**:
    - `sDate`: تاريخ صالح، إجباري.
    - `eDate`: تاريخ صالح، إجباري.
    - `amount`: رقم، إجباري (يمثل المبلغ المودع شهرياً).
    - `symbol`: نص، إجباري، ويجب أن يكون حصرياً من قائمة الرموز المدعومة.
* **شكل الاستجابة الناجحة (Success Response 200 OK)**:
  * الرمز: `200`
  * شكل الاستجابة (JSON):
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
* **شكل استجابة الخطأ (تصرف غير متوقع في الباك إند - يرجى قراءة قسم Gotchas)**:
  > [!CAUTION]
  > **تنبيه هام جداً لمطور الفرونت إند**: 
  > عند حدوث خطأ تحقق (Joi) أو خطأ في الاتصال بسيرفر Tiingo الخارجي في هذا المسار بالتحديد، **يقوم الباك إند بإرجاع الرمز `200 OK` ولكن بجسم فارغ (Empty JSON/Null/Undefined) دون إعطاء رمز خطأ 400 أو رسالة خطأ واضحة** وذلك بسبب تعارض برمجي في معالجة الخطأ بين الخدمة والمتحكم.
  >
  > يجب على مطور الفرونت إند فحص الاستجابة: إذا كان الكائن المستلم فارغاً أو لا يحتوي على الحقل `ozet`، يجب اعتبار الطلب فاشلاً وعرض رسالة خطأ للمستخدم.

---

## 5. الثوابت وحالات النظام (Enums & Global Constants)

يحتوي النظام على مصفوفتين أساسيتين تمثلان قائمة الرموز المدعومة للتداول والاستعلام عن أسعارها ومحاكاة محافظها الاستثمارية.

*المصدر: [companySymbol.models.js](file:///c:/Users/yusuf_pc/Desktop/FinancalProjecket1-main/models/companySymbol.models.js)*

### الرموز والشركات المدعومة بالكامل
تحتوي مصفوفة `companySymbolAndName` على الكائنات التالية المكونة من الرمز (`sembol`) واسم الشركة الكامل بالإنجليزية (`isim`):

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

## 6. ملاحظات حرجة لمطور الفرونت إند (Gotchas & Edge Cases)

يجب على مطور الفرونت إند الانتباه الكامل للسلوكيات التالية لتجنب انهيار الواجهة أو ظهور أخطاء غير مفهومة للمستخدم:

1. **طريقة تمرير التوكن**:
   تذكر دائماً أن التوكن يرسل كـ `token` في الـ Header وليس كـ Bearer token في `Authorization`.
   
2. **صيغة التواريخ والفلترة اليومية**:
   يقبل الباك إند التواريخ بصيغة `YYYY-MM-DD` (أو أي صيغة يقبلها كائن التاريخ في جافاسكريبت). يقوم الباك إند بتقسيم التاريخ عند حرف الـ `"T"` لأخذ الجزء الأول فقط عند التعامل مع استجابات الأسهم لتظهر بصيغة `YYYY-MM-DD`.

3. **أيام نهاية الأسبوع (Weekends)**:
   أسواق الأسهم مغلقة يومي السبت والأحد. لذلك:
   - مسار `/api/company/amount` (Lump Sum) يقوم بالتحقق من تاريخ الشراء والبيع فإذا وافق أحدهما يوم سبت أو أحد سيفشل الطلب فوراً ويعيد خطأ كود 400.
   - يجب على الفرونت إند برمجة حقل اختيار التاريخ (Date Picker) بحيث يمنع المستخدم من اختيار يومي السبت والأحد لضمان تجربة مستخدم خالية من أخطاء السيرفر.

4. **توقيت الاستثمار في DCA**:
   تقوم خوارزمية DCA بشراء الأسهم في بداية كل شهر يظهر في تيار البيانات التاريخية المستلمة من Tiingo. يتم تجميع إجمالي عدد الأسهم المشتراة مضروباً في سعر الإغلاق لآخر يوم في التاريخ المحدد لتحديد القيمة الإجمالية للمحفظة في نهاية المحاكاة.

5. **عرض كلمة مرور المستخدم في قائمة المستخدمين**:
   مسار `GET /api/users` يعيد جميع بيانات المستخدمين بما في ذلك الهاش الخاص بكلمة المرور (`password`). يجب عدم عرض هذا الحقل نهائياً في الواجهات لأسباب أمنية.

6. **تصرف الخطأ الفريد لمسار الـ DCA**:
   في حال حدوث خطأ في مسار `POST /api/company/dca` (سواء بسبب عدم وجود بيانات في تلك الفترة، أو مشكلة في مفتاح Tiingo الخارجي، أو خطأ تحقق Joi)، فإن الباك إند يرجع الرمز `200 OK` ولكن بجسم فارغ (Empty JSON/Null/Undefined) دون إعطاء رمز خطأ 400 أو رسالة خطأ واضحة.
   *الحل على الفرونت إند:* تحقق دائماً مما إذا كانت استجابة المسار خالية من كائن الخلاصة `ozet` قبل محاولة قراءته، وإلا اعتبر الطلب فاشلاً واعرض رسالة خطأ ملائمة للمستخدم.

7. **بنية رسائل الأخطاء الـ String**:
   ترجع معظم المسارات عند فشل التحقق أو وقوع خطأ محدد رسالة الخطأ كـ **سلسلة نصية خام (Raw JSON String)** بدلاً من الكائن المعتاد `{ "message": "..." }`. الاستثناء الوحيد هو مسار Lump Sum (`/api/company/amount`) الذي يرجع كائن خطأ منظم يحتوي على `{ "message": "..." }`.
   *الحل على الفرونت إند:* يجب معالجة استجابات الخطأ بشكل مرن (بحيث يقرأ النص مباشرة إذا كان الخطأ عبارة عن string، أو يقرأ خاصية `message` إذا كان كائناً).

8. **الاعتماد على مفتاح Tiingo API**:
   جميع وظائف الأسهم تعتمد بالكامل على المتغير `TIINGO_API_KEY` المعرف في البيئة. في حال نفاد حد الاستهلاك المجاني أو عدم إعداد المفتاح بشكل صحيح، ستفشل جميع مسارات الـ `/api/company/*` وتعيد أخطاء (غالباً 500 أو استجابات فارغة).
