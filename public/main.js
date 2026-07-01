      const companyList = [
        { sembol: 'AAPL', isim: 'Apple Inc.' },
        { sembol: 'MSFT', isim: 'Microsoft Corporation' },
        { sembol: 'GOOGL', isim: 'Alphabet Inc.' },
        { sembol: 'AMZN', isim: 'Amazon.com Inc.' },
        { sembol: 'META', isim: 'Meta Platforms Inc.' },
        { sembol: 'NVDA', isim: 'NVIDIA Corporation' },
        { sembol: 'TSLA', isim: 'Tesla Inc.' },
        { sembol: 'HPQ', isim: 'HP Inc.' },
        { sembol: 'JNJ', isim: 'Johnson & Johnson' },
        { sembol: 'V', isim: 'Visa Inc.' },
        { sembol: 'WMT', isim: 'Walmart Inc.' },
        { sembol: 'JPM', isim: 'JPMorgan Chase & Co.' },
        { sembol: 'PG', isim: 'The Procter & Gamble Company' },
        { sembol: 'MA', isim: 'Mastercard Incorporated' },
        { sembol: 'UNH', isim: 'UnitedHealth Group Incorporated' },
        { sembol: 'DIS', isim: 'The Walt Disney Company' },
        { sembol: 'HD', inclin: 'The Home Depot Inc.' },
        { sembol: 'BAC', isim: 'Bank of America Corporation' },
        { sembol: 'XOM', isim: 'Exxon Mobil Corporation' },
        { sembol: 'CVX', isim: 'Chevron Corporation' },
        { sembol: 'KO', isim: 'The Coca-Cola Company' },
        { sembol: 'PEP', isim: 'PepsiCo Inc.' },
        { sembol: 'COST', isim: 'Costco Wholesale Corporation' },
        { sembol: 'PFE', isim: 'Pfizer Inc.' },
        { sembol: 'MRK', isim: 'Merck & Co. Inc.' },
        { sembol: 'TMO', isim: 'Thermo Fisher Scientific Inc.' },
        { sembol: 'MCD', isim: "McDonald's Corporation" },
        { sembol: 'CRM', isim: 'Salesforce Inc.' },
        { sembol: 'CSCO', isim: 'Cisco Systems Inc.' },
        { sembol: 'ABT', isim: 'Abbott Laboratories' },
        { sembol: 'ACN', isim: 'Accenture plc' },
        { sembol: 'NFLX', isim: 'Netflix Inc.' },
        { sembol: 'ADBE', isim: 'Adobe Inc.' },
        { sembol: 'INTC', isim: 'Intel Corporation' },
        { sembol: 'AMD', isim: 'Advanced Micro Devices Inc.' },
        { sembol: 'CMCSA', isim: 'Comcast Corporation' },
        { sembol: 'NKE', isim: 'NIKE Inc.' },
        { sembol: 'TXN', isim: 'Texas Instruments Incorporated' },
        { sembol: 'PM', isim: 'Philip Morris International Inc.' },
        { sembol: 'LIN', isim: 'Linde plc' },
        { sembol: 'NEE', isim: 'NextEra Energy Inc.' },
        { sembol: 'UNP', isim: 'Union Pacific Corporation' },
        { sembol: 'ORCL', isim: 'Oracle Corporation' },
        { sembol: 'WFC', isim: 'Wells Fargo & Company' },
        { sembol: 'QCOM', isim: 'QUALCOMM Incorporated' },
        { sembol: 'HON', isim: 'Honeywell International Inc.' },
        { sembol: 'UPS', isim: 'United Parcel Service Inc.' },
        { sembol: 'RTX', isim: 'RTX Corporation' },
        { sembol: 'BA', isim: 'The Boeing Company' },
        { sembol: 'IBM', isim: 'International Business Machines Corporation' },
        { sembol: 'LLY', isim: 'Eli Lilly and Company' },
        { sembol: 'SBUX', isim: 'Starbucks Corporation' },
        { sembol: 'GE', isim: 'General Electric Company' },
        { sembol: 'CAT', isim: 'Caterpillar Inc.' },
        { sembol: 'GS', isim: 'The Goldman Sachs Group Inc.' },
        { sembol: 'MS', isim: 'Morgan Stanley' },
        { sembol: 'BLK', isim: 'BlackRock Inc.' },
        { sembol: 'MMM', isim: '3M Company' },
        { sembol: 'C', isim: 'Citigroup Inc.' },
        { sembol: 'AXP', isim: 'American Express Company' },
        { sembol: 'T', isim: 'AT&T Inc.' },
        { sembol: 'VZ', isim: 'Verizon Communications Inc.' },
        { sembol: 'F', isim: 'Ford Motor Company' },
        { sembol: 'GM', isim: 'General Motors Company' },
        { sembol: 'TGT', isim: 'Target Corporation' },
        { sembol: 'LOW', isim: "Lowe's Companies Inc." },
        { sembol: 'CVS', isim: 'CVS Health Corporation' },
        { sembol: 'WBA', isim: 'Walgreens Boots Alliance Inc.' },
        { sembol: 'BMY', isim: 'Bristol-Myers Squibb Company' },
        { sembol: 'GILD', isim: 'Gilead Sciences Inc.' },
        { sembol: 'AMGN', isim: 'Amgen Inc.' },
        { sembol: 'ISRG', isim: 'Intuitive Surgical Inc.' },
        { sembol: 'MDT', isim: 'Medtronic plc' },
        { sembol: 'SYK', isim: 'Stryker Corporation' },
        { sembol: 'SPGI', isim: 'S&P Global Inc.' },
        { sembol: 'INTU', isim: 'Intuit Inc.' },
        { sembol: 'NOW', isim: 'ServiceNow Inc.' },
        { sembol: 'PYPL', isim: 'PayPal Holdings Inc.' },
        { sembol: 'SQ', isim: 'Block Inc.' },
        { sembol: 'UBER', isim: 'Uber Technologies Inc.' },
        { sembol: 'ABNB', isim: 'Airbnb Inc.' },
        { sembol: 'SNOW', isim: 'Snowflake Inc.' },
        { sembol: 'PLTR', isim: 'Palantir Technologies Inc.' },
        { sembol: 'ROKU', isim: 'Roku Inc.' },
        { sembol: 'ZM', isim: 'Zoom Video Communications Inc.' },
        { sembol: 'DOCU', isim: 'DocuSign Inc.' },
        { sembol: 'SPOT', isim: 'Spotify Technology S.A.' },
        { sembol: 'SHOP', isim: 'Shopify Inc.' },
        { sembol: 'CRWD', isim: 'CrowdStrike Holdings Inc.' },
        { sembol: 'NET', isim: 'Cloudflare Inc.' },
        { sembol: 'DDOG', isim: 'Datadog Inc.' },
        { sembol: 'TEAM', isim: 'Atlassian Corporation' },
        { sembol: 'OKTA', isim: 'Okta Inc.' },
        { sembol: 'ZS', isim: 'Zscaler Inc.' },
        { sembol: 'PANW', isim: 'Palo Alto Networks Inc.' },
        { sembol: 'FTNT', isim: 'Fortinet Inc.' },
        { sembol: 'LMT', isim: 'Lockheed Martin Corporation' },
        { sembol: 'NOC', isim: 'Northrop Grumman Corporation' },
        { sembol: 'GD', isim: 'General Dynamics Corporation' },
        { sembol: 'DE', isim: 'Deere & Company' },
        { sembol: 'WM', isim: 'Waste Management Inc.' },
      ];

      let tmChart = null,
        lsChart = null,
        mtChart = null,
        dcaChart = null,
        bannerChart = null;

      document.addEventListener('DOMContentLoaded', () => {
        populateDropdowns();
        checkAuth();

        document
          .getElementById('register-form')
          .addEventListener('submit', handleRegister);
        document
          .getElementById('login-form')
          .addEventListener('submit', handleLogin);
        document
          .getElementById('time-machine-form')
          .addEventListener('submit', drawTimeMachine);
        document
          .getElementById('lump-sum-form')
          .addEventListener('submit', runlumpsum);
        document
          .getElementById('market-timing-form')
          .addEventListener('submit', runMarketTiming);
        document.getElementById('dca-form').addEventListener('submit', runDCA);
        document
          .getElementById('reg-password')
          .addEventListener('input', validatePasswordUI);
        document
          .getElementById('password-reset-form')
          .addEventListener('submit', handlePasswordReset);
        document
          .getElementById('update-user-form')
          .addEventListener('submit', handleUpdateUser);
        document
          .getElementById('delete-account-form')
          .addEventListener('submit', handleDeleteAccount);
        document
          .getElementById('buy-investment-form')
          .addEventListener('submit', handleBuyInvestment);

        // Görev 1: Şifre Göster/Gizle Toggle
        document
          .getElementById('toggleLoginPwdBtn')
          .addEventListener('click', function () {
            const pwdInput = document.getElementById('login-password');
            const icon = document.getElementById('toggleLoginPwdIcon');
            if (pwdInput.type === 'password') {
              pwdInput.type = 'text';
              icon.className = 'fa-solid fa-eye-slash';
            } else {
              pwdInput.type = 'password';
              icon.className = 'fa-solid fa-eye';
            }
          });

        // Görev 2: Şifremi Unuttum linki -> Login modalı kapat, Reset modalı aç
        document
          .getElementById('forgot-password-link')
          .addEventListener('click', function (e) {
            e.preventDefault();
            const loginModal = bootstrap.Modal.getInstance(
              document.getElementById('loginModal')
            );
            if (loginModal) loginModal.hide();
            setTimeout(() => {
              new bootstrap.Modal(
                document.getElementById('passwordResetModal')
              ).show();
            }, 400);
          });

        // SOBER WEEKEND VALIDATOR (Maddde 3: Yerel Saat Dilimi Sapma Düzeltmesi)
        document.querySelectorAll('.date-validate').forEach((el) => {
          el.addEventListener('change', (e) => {
            const input = e.target;
            const alertBox =
              input.parentElement.querySelector('.weekend-alert-box');
            const dateVal = input.value;

            if (dateVal) {
              const parts = dateVal.split('-');
              const year = parseInt(parts[0], 10);
              const month = parseInt(parts[1], 10) - 1;
              const day = parseInt(parts[2], 10);

              const localDate = new Date(year, month, day);
              const dayOfWeek = localDate.getDay();

              if (dayOfWeek === 0 || dayOfWeek === 6) {
                if (alertBox) alertBox.style.display = 'block';
                input.style.borderColor = '#B91C1C';
                input.setCustomValidity(
                  'Borsa hafta sonları kapalıdır. Lütfen Pazartesi-Cuma arası seçin.'
                );
              } else {
                if (alertBox) alertBox.style.display = 'none';
                input.style.borderColor = '#A1AAA9';
                input.setCustomValidity('');
              }
            } else {
              if (alertBox) alertBox.style.display = 'none';
              input.style.borderColor = '#A1AAA9';
              input.setCustomValidity('');
            }
          });
        });
      });

      async function showSection(id) {
        // AUTH GUARD (Yetkilendirme Koruması)
        if (
          id === 'investments-section' ||
          id === 'movements-section' ||
          id === 'lump-sum-section' ||
          id === 'dca-section'
        ) {
          const token = localStorage.getItem('kuantum_token');
          if (!token) {
            Swal.fire({
              icon: 'warning',
              title: 'Yetkisiz Erişim',
              text: 'Lütfen önce giriş yapınız.',
              confirmButtonColor: '#1E5AA8',
            }).then(() => {
              new bootstrap.Modal(document.getElementById('loginModal')).show();
            });
            return;
          }
        }

        document
          .querySelectorAll('.app-section')
          .forEach((s) => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        document
          .querySelectorAll('.main-navbar .nav-link')
          .forEach((l) => l.classList.remove('active'));

        if (id === 'time-machine-section')
          document.getElementById('nav-time-machine').classList.add('active');
        if (id === 'lump-sum-section')
          document.getElementById('nav-lump-sum').classList.add('active');
        if (id === 'market-timing-section')
          document.getElementById('nav-market-timing').classList.add('active');
        if (id === 'dca-section')
          document.getElementById('nav-dca').classList.add('active');
        if (id === 'live-tracking-section')
          document.getElementById('nav-live-tracking').classList.add('active');
        if (id === 'investments-section') {
          loadInvestments();
        }
        if (id === 'movements-section') {
          loadMovements();
        }
        window.scrollTo(0, 0);
      }

      async function loadInvestments() {
        const userId = localStorage.getItem('kuantum_userId');
        if (!userId) return;
        try {
          const data = await ApiService.getInvestments(userId);
          const tbody = document.getElementById('investments-table-body');
          tbody.innerHTML = '';
          
          if (!data || !Array.isArray(data) || data.length === 0 || (data.length === 1 && typeof data[0] === 'string')) {
            tbody.innerHTML =
              '<tr><td colspan="6" class="text-muted">Henüz portföyünüzde bir yatırım bulunmamaktadır.</td></tr>';
            
            const totalContainer = document.getElementById('portfolio-total-container');
            if (totalContainer) totalContainer.classList.add('d-none');
            return;
          }
          
          data.forEach((inv) => {
            if (typeof inv === 'string') {
              const totalContainer = document.getElementById('portfolio-total-container');
              const totalText = document.getElementById('portfolio-total-text');
              if (totalContainer && totalText) {
                const numStr = inv.replace('Tum varliklariniz', '').trim();
                const num = parseFloat(numStr);
                if (!isNaN(num)) {
                  totalText.textContent = "Toplam Portföy Değeri: $" + num.toLocaleString('tr-TR', { minimumFractionDigits: 2 });
                } else {
                  totalText.textContent = inv;
                }
                totalContainer.classList.remove('d-none');
              }
              return;
            }
            
            const tr = document.createElement('tr');
            const getiriOrani = inv.getiriOrani || '0%';
            const isPositive = !getiriOrani.toString().startsWith('-');
            
            tr.innerHTML = `
              <td class="fw-bold">${inv.sembol || '-'}</td>
              <td>${inv.alinanFonMiktari || 0}</td>
              <td>$${(inv.yatirilanTutar || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              <td>$${(inv.guncelDeger || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              <td class="${(inv.netKarZarar || 0) >= 0 ? 'text-success' : 'text-danger'} fw-bold">
                ${(inv.netKarZarar || 0) >= 0 ? '+' : ''}$${(inv.netKarZarar || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </td>
              <td class="${isPositive ? 'text-success' : 'text-danger'} fw-bold">
                ${getiriOrani}
              </td>
            `;
            tbody.appendChild(tr);
          });
        } catch (err) {
          console.error('Yatırımlarım yüklenirken hata:', err);
          document.getElementById('investments-table-body').innerHTML =
            '<tr><td colspan="6" class="text-danger">Veriler yüklenirken hata oluştu.</td></tr>';
        }
      }

      async function loadMovements() {
        const userId = localStorage.getItem('kuantum_userId');
        if (!userId) return;
        try {
          const data = await ApiService.getMovements(userId);
          const tbody = document.getElementById('movements-table-body');
          tbody.innerHTML = '';
          
          if (!data || !Array.isArray(data) || data.length === 0) {
            tbody.innerHTML =
              '<tr><td colspan="6" class="text-muted">İşlem geçmişiniz bulunmamaktadır.</td></tr>';
            return;
          }
          
          data.forEach((mov) => {
            const tr = document.createElement('tr');
            const islem = mov.islem || {};
            const isBuy = mov.islemTuru === 'buy' || mov.islemTuru === 'Alış' || mov.islemTuru === 'Alım';
            
            tr.innerHTML = `
              <td>${new Date(mov.tarih).toLocaleDateString('tr-TR')}</td>
              <td><span class="badge ${isBuy ? 'bg-success' : 'bg-danger'}">${mov.islemTuru || '-'}</span></td>
              <td class="fw-bold">${islem.sembol || '-'}</td>
              <td>$${(islem.yatirilanTutar || 0).toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</td>
              <td>${islem.alinanFonMiktari || 0}</td>
              <td>Tamamlandı</td>
            `;
            tbody.appendChild(tr);
          });
        } catch (err) {
          console.error('İşlem geçmişi yüklenirken hata:', err);
          document.getElementById('movements-table-body').innerHTML =
            '<tr><td colspan="6" class="text-danger">Veriler yüklenirken hata oluştu.</td></tr>';
        }
      }

      function populateDropdowns() {
        document.querySelectorAll('.company-select').forEach((select) => {
          select.innerHTML =
            '<option value="" disabled selected>Hisse Senedi Seçiniz...</option>';
          companyList.forEach((c) => {
            select.innerHTML += `<option value="${c.sembol}">${c.sembol} - ${c.isim}</option>`;
          });

          const ts = new TomSelect(select, {
            create: false,
            sortField: { field: 'text', direction: 'asc' },
            placeholder: 'Hisse Senedi Ara...',
            maxOptions: null,
          });

          // Global Price Banner Tetikleyicisi
          if (select.id !== 'buy-symbol') {
            ts.on('change', async function (value) {
              if (!value) return;
              try {
                const data = await ApiService.getCurrentPrice({
                  symbol: value,
                });
                document
                  .getElementById('global-price-banner')
                  .classList.remove('d-none');
                document.getElementById('banner-symbol').textContent = value;

                if (data && data.length > 0) {
                  const latestPrice =
                    data[data.length - 1].kapanisFiyati ||
                    data[data.length - 1].close ||
                    0;
                  document.getElementById('banner-price').textContent =
                    '$' +
                    latestPrice.toLocaleString('tr-TR', {
                      minimumFractionDigits: 2,
                    });

                  // Chart Render
                  if (bannerChart) bannerChart.destroy();
                  const ctx = document
                    .getElementById('bannerTrendChart')
                    .getContext('2d');
                  const labels = data.map((d) => {
                    let l = d.tarih || d.date || '';
                    if (l.includes('==>')) l = 'Güncel';
                    return l;
                  });
                  const prices = data.map(
                    (d) => d.kapanisFiyati || d.close || 0
                  );

                  bannerChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                      labels: labels,
                      datasets: [
                        {
                          label: `${value} Fiyatı`,
                          data: prices,
                          borderColor: '#10b981',
                          backgroundColor: 'rgba(16, 185, 129, 0.1)',
                          borderWidth: 2,
                          fill: true,
                          tension: 0.2,
                          pointRadius: 4,
                          pointBackgroundColor: '#10b981',
                        },
                      ],
                    },
                    options: {
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                      },
                      scales: {
                        x: { display: true, grid: { display: false } },
                        y: { display: true, grid: { color: '#e5e7eb' } },
                      },
                    },
                  });
                } else {
                  document.getElementById('banner-price').textContent = '-';
                  if (bannerChart) bannerChart.destroy();
                }
              } catch (err) {
                console.error('Güncel fiyat alınamadı', err);
              }
            });
          }
        });
      }

      function checkAuth() {
        const token = localStorage.getItem('kuantum_token');
        const username = localStorage.getItem('kuantum_username');
        if (token && username) {
          document.getElementById('auth-buttons').classList.add('d-none');
          document.getElementById('user-profile').classList.remove('d-none');
          document.getElementById('user-profile').style.display = '';
          document.getElementById('username-display').textContent = username;
        } else {
          document.getElementById('auth-buttons').classList.remove('d-none');
          document.getElementById('user-profile').classList.add('d-none');
        }
      }

      function logout() {
        localStorage.clear();
        checkAuth();
        showSection('landing-section');
      }

      function validatePasswordUI(e) {
        const val = e.target.value;
        const rules = {
          len: val.length >= 8,
          up: /[A-Z]/.test(val),
          low: /[a-z]/.test(val),
          num: /[0-9]/.test(val),
          spec: /[@$!%*?&]/.test(val),
        };
        Object.keys(rules).forEach((k) => {
          const el = document.getElementById(`rule-${k}`);
          if (rules[k]) {
            el.className = 'text-success fw-bold';
            el.querySelector('i').className = 'fa-solid fa-check me-1';
          } else {
            el.className = 'text-danger';
            el.querySelector('i').className = 'fa-solid fa-xmark me-1';
          }
        });
      }

      // Madde 2: Boş Catch Bloklarının Swal Hata Yönetimiyle Doldurulması
      async function handleRegister(e) {
        e.preventDefault();
        try {
          Swal.showLoading();
          await ApiService.register({
            email: regEl('reg-email'),
            username: regEl('reg-username'),
            age: regEl('reg-age'),
            password: regEl('reg-password'),
          });
          bootstrap.Modal.getInstance(
            document.getElementById('registerModal')
          ).hide();
          document.getElementById('register-form').reset();
          Swal.fire({
            icon: 'success',
            title: 'Kayıt Başarılı',
            text: 'Sisteme giriş yapabilirsiniz.',
            confirmButtonColor: '#1E5AA8',
          }).then(() =>
            new bootstrap.Modal(document.getElementById('loginModal')).show()
          );
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Kayıt işlemi gerçekleştirilemedi. Lütfen kurumsal e-posta veya bilgilerinizi kontrol edin.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      async function handleLogin(e) {
        e.preventDefault();
        try {
          Swal.showLoading();
          const res = await ApiService.login({
            email: regEl('login-email'),
            password: regEl('login-password'),
          });
          localStorage.setItem('kuantum_token', res.data.token);
          localStorage.setItem('kuantum_username', res.data.username);
          localStorage.setItem('kuantum_userId', res.data._id);
          localStorage.setItem('kuantum_age', res.data.age);
          checkAuth();
          bootstrap.Modal.getInstance(
            document.getElementById('loginModal')
          ).hide();
          document.getElementById('login-form').reset();
          Swal.close();
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Oturum Açılamadı',
            text: 'E-posta veya şifre hatalı.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      function regEl(id) {
        return document.getElementById(id).value;
      }

      // Görev 2: Şifre Sıfırlama Talep Handler
      async function handlePasswordReset(e) {
        e.preventDefault();
        const email = regEl('reset-email');
        try {
          Swal.showLoading();
          await api.post('/api/users/password-reset', { email });
          bootstrap.Modal.getInstance(
            document.getElementById('passwordResetModal')
          ).hide();
          document.getElementById('password-reset-form').reset();
          Swal.fire({
            icon: 'success',
            title: 'Bağlantı Gönderildi!',
            text: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.',
            confirmButtonColor: '#1E5AA8',
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Şifre sıfırlama isteği gönderilemedi. E-posta adresinizi kontrol edin.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      // Görev 3: Hesap Güncelleme Modalını Aç (mevcut verilerle doldur)
      function openUpdateUserModal() {
        document.getElementById('update-username').value =
          localStorage.getItem('kuantum_username') || '';
        document.getElementById('update-age').value =
          localStorage.getItem('kuantum_age') || '';
        new bootstrap.Modal(document.getElementById('updateUserModal')).show();
      }

      function openDeleteAccountModal() {
        document.getElementById('delete-account-form').reset();
        new bootstrap.Modal(
          document.getElementById('deleteAccountModal')
        ).show();
      }

      async function handleBuyInvestment(e) {
        e.preventDefault();
        const userId = localStorage.getItem('kuantum_userId');
        const token = localStorage.getItem('kuantum_token');

        if (!userId || !token) {
          return Swal.fire({
            icon: 'warning',
            title: 'Yetkisiz Erişim',
            text: 'Bu işlemi gerçekleştirmek için lütfen giriş yapınız.',
            confirmButtonColor: '#1E5AA8',
          }).then(() => {
            new bootstrap.Modal(document.getElementById('loginModal')).show();
          });
        }

        const symbol = document.getElementById('buy-symbol').tomselect ? document.getElementById('buy-symbol').tomselect.getValue() : document.getElementById('buy-symbol').value;
        const amount = document.getElementById('buy-amount').value;
        const date = document.getElementById('buy-date').value;

        if (!symbol) {
          return Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Lütfen yatırım yapmak istediğiniz hisse senedini seçin.',
            confirmButtonColor: '#1E5AA8',
          });
        }

        try {
          Swal.showLoading();
          const res = await ApiService.buyInvestment(userId, {
            symbol,
            amount: Number(amount),
            date,
          });

          if (res && res.error) {
            Swal.fire({
              icon: 'error',
              title: 'İşlem Başarısız',
              text: res.error,
              confirmButtonColor: '#1E5AA8',
            });
            return;
          }

          Swal.fire({
            icon: 'success',
            title: 'Başarılı!',
            text: 'Yatırımınız başarıyla kaydedildi.',
            confirmButtonColor: '#1E5AA8',
          });
          document.getElementById('buy-investment-form').reset();
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'İşlem Başarısız',
            text:
              err.response?.data?.error ||
              err.response?.data?.message ||
              err.message ||
              'Yatırım işlemi sırasında bir hata oluştu.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      async function handleDeleteAccount(e) {
        e.preventDefault();
        const userId = localStorage.getItem('kuantum_userId');
        const token = localStorage.getItem('kuantum_token');

        if (!userId || !token) {
          return Swal.fire({
            icon: 'warning',
            title: 'Oturum Bulunamadı',
            text: 'Lütfen önce giriş yapın.',
            confirmButtonColor: '#1E5AA8',
          });
        }

        const email = document.getElementById('delete-email').value;
        const password = document.getElementById('delete-password').value;

        const confirmResult = await Swal.fire({
          title: 'Emin misiniz?',
          text: 'Hesabınızı silerseniz, sahip olduğunuz tüm yatırımlar ve işlem geçmişiniz kalıcı olarak silinecektir. Onaylıyor musunuz?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#6c757d',
          confirmButtonText: 'Evet, Kalıcı Olarak Sil',
          cancelButtonText: 'Vazgeç',
        });

        if (!confirmResult.isConfirmed) {
          return;
        }

        try {
          Swal.showLoading();
          await ApiService.deleteAccount(userId, { email, password });

          bootstrap.Modal.getInstance(
            document.getElementById('deleteAccountModal')
          ).hide();
          document.getElementById('delete-account-form').reset();

          localStorage.clear();
          checkAuth();
          showSection('landing-section');

          Swal.fire({
            icon: 'success',
            title: 'Hesap Silindi',
            text: 'Hesabınız başarıyla silindi. Görüşmek üzere!',
            confirmButtonColor: '#1E5AA8',
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Silme İşlemi Başarısız',
            text: 'E-posta veya şifre hatalı olabilir. Lütfen kontrol edin.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      // Görev 3: Hesap Güncelleme Handler
      async function handleUpdateUser(e) {
        e.preventDefault();
        const username = regEl('update-username');
        const age = Number(regEl('update-age'));
        const userId = localStorage.getItem('kuantum_userId');
        const token = localStorage.getItem('kuantum_token');

        if (!userId || !token) {
          return Swal.fire({
            icon: 'warning',
            title: 'Oturum Bulunamadı',
            text: 'Lütfen önce giriş yapın.',
            confirmButtonColor: '#1E5AA8',
          });
        }

        try {
          Swal.showLoading();
          const response = await fetch(`/api/users/user-update/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              token: token,
            },
            body: JSON.stringify({ username, age }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.message || data.error || 'Güncelleme başarısız oldu.'
            );
          }

          // localStorage güncelle
          localStorage.setItem('kuantum_username', username);
          localStorage.setItem('kuantum_age', age);
          checkAuth();

          bootstrap.Modal.getInstance(
            document.getElementById('updateUserModal')
          ).hide();
          document.getElementById('update-user-form').reset();
          Swal.fire({
            icon: 'success',
            title: 'Güncelleme Başarılı!',
            text: 'Hesap bilgileriniz başarıyla güncellendi.',
            confirmButtonColor: '#1E5AA8',
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Güncelleme Hatası',
            text: err.message || 'Bilgileriniz güncellenirken bir hata oluştu.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      function processChartData(data, diffDays) {
        if (diffDays <= 31)
          return {
            labels: data.map((d) => d.tarih),
            prices: data.map((d) => d.kapanisFiyati),
          };
        if (diffDays <= 365) {
          const labels = [],
            prices = [];
          for (let i = 0; i < data.length; i += 7) {
            labels.push(data[i].tarih);
            prices.push(data[i].kapanisFiyati);
          }
          return { labels, prices };
        }
        const monthly = {};
        data.forEach((item) => {
          const m = item.tarih.substring(0, 7);
          if (!monthly[m]) monthly[m] = [];
          monthly[m].push(item.kapanisFiyati);
        });
        return {
          labels: Object.keys(monthly),
          prices: Object.keys(monthly).map((k) =>
            Number(
              (
                monthly[k].reduce((a, b) => a + b, 0) / monthly[k].length
              ).toFixed(2)
            )
          ),
        };
      }

      function getAcademicChartConfig(
        symbol,
        labelText,
        processedData,
        customPointColors = null,
        customRadii = null
      ) {
        return {
          type: 'line',
          data: {
            labels: processedData.labels,
            datasets: [
              {
                label: `${symbol} - ${labelText}`,
                data: processedData.prices,
                borderColor: '#1E5AA8',
                backgroundColor: 'rgba(30, 90, 168, 0.08)',
                borderWidth: 2,
                fill: true,
                tension: 0.1,
                pointBackgroundColor: customPointColors || '#1E5AA8',
                pointRadius:
                  customRadii || (processedData.labels.length > 50 ? 0 : 2),
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: {
                labels: {
                  font: { family: 'Georgia, serif', size: 13 },
                  color: '#102A4D',
                },
              },
            },
            scales: {
              x: {
                grid: { color: '#E5E7EB' },
                ticks: { color: '#4B5563', font: { size: 11 } },
              },
              y: {
                grid: { color: '#E5E7EB' },
                ticks: { color: '#4B5563', font: { size: 11 } },
              },
            },
          },
        };
      }

      // MODÜL 1
      async function drawTimeMachine(e) {
        e.preventDefault();
        const symbol = regEl('tm-symbol'),
          sDate = regEl('tm-sdate'),
          eDate = regEl('tm-edate');
        const diffDays = Math.ceil(
          (new Date(eDate) - new Date(sDate)) / (1000 * 60 * 60 * 24)
        );
        if (diffDays <= 0) return;

        try {
          Swal.showLoading();
          const priceData = await ApiService.getPrices({
            sDate,
            eDate,
            symbol,
          });
          Swal.close();
          if (!priceData || priceData.length === 0)
            return Swal.fire({
              icon: 'info',
              title: 'Kayıt Yok',
              text: 'Bu aralıkta borsa verisi bulunamadı.',
              confirmButtonColor: '#1E5AA8',
            });

          const processed = processChartData(priceData, diffDays);
          const fPrice = priceData[0].kapanisFiyati,
            lPrice = priceData[priceData.length - 1].kapanisFiyati;
          const peak = Math.max(...priceData.map((d) => d.kapanisFiyati)),
            net = lPrice - fPrice;

          document.getElementById('tm-first-price').textContent =
            `$${fPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('tm-last-price').textContent =
            `$${lPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('tm-peak').textContent =
            `$${peak.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('tm-change').textContent =
            `${net >= 0 ? '+' : ''}$${net.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} (${((net / fPrice) * 100).toFixed(2)}%)`;
          document.getElementById('tm-change').className =
            `metric-value ${net >= 0 ? 'val-profit' : 'val-loss'}`;
          document
            .getElementById('time-machine-metrics')
            .classList.remove('d-none');

          if (tmChart) tmChart.destroy();
          tmChart = new Chart(
            document.getElementById('timeMachineChart').getContext('2d'),
            getAcademicChartConfig(symbol, 'Kapanış Fiyatı ($)', processed)
          );
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Hata',
            text: 'Fiyat verileri API sunucusundan çekilemedi.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      // MODÜL 2
      async function runlumpsum(e) {
        e.preventDefault();
        const symbol = regEl('ls-symbol'),
          amount = Number(regEl('ls-amount')),
          buyDate = regEl('ls-buydate'),
          saleDate = regEl('ls-saledate');
        const diffDays = Math.ceil(
          (new Date(saleDate) - new Date(buyDate)) / (1000 * 60 * 60 * 24)
        );
        if (diffDays <= 0) return;

        try {
          Swal.showLoading();
          const res = await ApiService.getlumpsum({
            buyDate,
            saleDate,
            amount,
            symbol,
          });
          const priceData = await ApiService.getPrices({
            sDate: buyDate,
            eDate: saleDate,
            symbol,
          });
          Swal.close();

          const data = res.data;
          document.getElementById('m-invested').textContent =
            `$${data.yatirilanTutar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('m-current').textContent =
            `$${data.guncelDeger.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('m-profit').textContent =
            `${data.netKarZarar >= 0 ? '+' : ''}$${data.netKarZarar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('m-roi').textContent = data.getiriOrani;
          document.getElementById('m-profit').className =
            `metric-value ${data.netKarZarar >= 0 ? 'val-profit' : 'val-loss'}`;
          document.getElementById('m-roi').className =
            `metric-value ${data.netKarZarar >= 0 ? 'val-profit' : 'val-loss'}`;
          document
            .getElementById('lump-sum-metrics')
            .classList.remove('d-none');

          const processed = processChartData(priceData, diffDays);
          const pColors = processed.labels.map((l) =>
            l === buyDate ? '#15803D' : l === saleDate ? '#B91C1C' : '#1E5AA8'
          );
          const pRadii = processed.labels.map((l) =>
            l === buyDate || l === saleDate
              ? 7
              : processed.labels.length > 50
                ? 0
                : 2
          );

          if (lsChart) lsChart.destroy();
          lsChart = new Chart(
            document.getElementById('lumpsumChart').getContext('2d'),
            getAcademicChartConfig(
              symbol,
              'Portföy Projeksiyonu ($)',
              processed,
              pColors,
              pRadii
            )
          );
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Simülasyon Hatası',
            text: 'Toplu sermaye getiri hesabı başarısız oldu.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      // MODÜL 3
      async function runMarketTiming(e) {
        e.preventDefault();
        const symbol = regEl('mt-symbol'),
          sDate = regEl('mt-sdate'),
          eDate = regEl('mt-edate');
        const diffDays = Math.ceil(
          (new Date(eDate) - new Date(sDate)) / (1000 * 60 * 60 * 24)
        );
        if (diffDays <= 0) return;

        try {
          Swal.showLoading();
          const timing = await ApiService.getMarketTiming({
            sDate,
            eDate,
            symbol,
          });
          const prices = await ApiService.getPrices({ sDate, eDate, symbol });
          Swal.close();

          document.getElementById('mt-lowest-val').textContent =
            `$${timing.enDusuk.fiyat.toFixed(2)}`;
          document.getElementById('mt-lowest-date').textContent =
            `Tarih: ${timing.enDusuk.tarih}`;
          document.getElementById('mt-highest-val').textContent =
            `$${timing.enYuksek.fiyat.toFixed(2)}`;
          document.getElementById('mt-highest-date').textContent =
            `Tarih: ${timing.enYuksek.tarih}`;
          document
            .getElementById('market-timing-metrics')
            .classList.remove('d-none');

          const processed = processChartData(prices, diffDays);
          const pColors = processed.labels.map((l) =>
            l === timing.enDusuk.tarih
              ? '#15803D'
              : l === timing.enYuksek.tarih
                ? '#B91C1C'
                : '#1E5AA8'
          );
          const pRadii = processed.labels.map((l) =>
            l === timing.enDusuk.tarih || l === timing.enYuksek.tarih ? 7 : 1
          );

          if (mtChart) mtChart.destroy();
          mtChart = new Chart(
            document.getElementById('marketTimingChart').getContext('2d'),
            getAcademicChartConfig(
              symbol,
              'Fiyat Sınır Eğrisi',
              processed,
              pColors,
              pRadii
            )
          );
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Analiz Hatası',
            text: 'Ekstremum tepe/dip değerleri hesaplanamadı.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }

      // MODÜL 4
      async function runDCA(e) {
        e.preventDefault();
        const symbol = regEl('dca-symbol'),
          amount = Number(regEl('dca-amount')),
          sDate = regEl('dca-sdate'),
          eDate = regEl('dca-edate');
        try {
          Swal.showLoading();
          const res = await ApiService.getDca({ sDate, eDate, amount, symbol });
          Swal.close();
          if (!res || !res.ozet)
            return Swal.fire({
              icon: 'error',
              title: 'Ekonometrik Hata',
              text: 'Bu periyotta DCA endeksi hesaplanamadı.',
              confirmButtonColor: '#1E5AA8',
            });

          const oz = res.ozet;
          document.getElementById('dca-total-invested').textContent =
            `$${oz.toplamYatirilanTutar.toLocaleString('tr-TR')}`;
          document.getElementById('dca-transactions-count').textContent =
            `${res.islemSayisi} Dönem Alımı`;
          document.getElementById('dca-portfolio-val').textContent =
            `$${oz.guncelPortfoyDegeri.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('dca-shares-owned').textContent =
            `${oz.toplamHisseAdedi.toFixed(4)} Birim Hisse`;
          document.getElementById('dca-profit-loss').textContent =
            `${oz.netKarZarar >= 0 ? '+' : ''}$${oz.netKarZarar.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}`;
          document.getElementById('dca-roi-pct').textContent =
            `Getiri Oranı: ${oz.getiriOrani}`;
          document.getElementById('dca-profit-loss').className =
            `metric-value ${oz.netKarZarar >= 0 ? 'val-profit' : 'val-loss'}`;
          document.getElementById('dca-metrics').classList.remove('d-none');

          if (dcaChart) dcaChart.destroy();
          const ctx = document.getElementById('dcaChart').getContext('2d');

          dcaChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: res.aylikDetaylar.map((d) => d.tarih),
              datasets: [
                {
                  label: 'Kümülatif Maliyet ($)',
                  data: res.aylikDetaylar.map((d) => d.toplamMaliyet),
                  borderColor: '#999999',
                  borderDash: [4, 4],
                  borderWidth: 2,
                  pointRadius: 1,
                },
                {
                  label: 'Portföy Büyüklüğü ($)',
                  data: res.aylikDetaylar.map((d) =>
                    Number((d.toplamHisse * d.fiyat).toFixed(2))
                  ),
                  borderColor: '#1E5AA8',
                  backgroundColor: 'rgba(30, 90, 168, 0.08)',
                  fill: true,
                  borderWidth: 2.5,
                  pointRadius: 2,
                  pointBackgroundColor: '#1E5AA8',
                },
              ],
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              interaction: { mode: 'index', intersect: false },
              scales: {
                x: { grid: { color: '#E5E7EB' } },
                y: { grid: { color: '#E5E7EB' } },
              },
            },
          });
        } catch (err) {
          Swal.fire({
            icon: 'error',
            title: 'Projeksiyon Hatası',
            text: 'Periyodik DCA birikim tablosu oluşturulurken teknik bir hata oluştu.',
            confirmButtonColor: '#1E5AA8',
          });
        }
      }
