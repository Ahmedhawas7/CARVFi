<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CARVFi - تسجيل الدخول</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        :root {
            --primary: #7C3AED;
            --primary-dark: #6D28D9;
            --dark: #1E293B;
            --gray-600: #475569;
            --gray-200: #E2E8F0;
            --white: #FFFFFF;
            --success: #10B981;
            --error: #EF4444;
        }

        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .login-container {
            background: var(--white);
            padding: 50px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            width: 100%;
            max-width: 450px;
            text-align: center;
        }

        .logo {
            font-size: 2.5rem;
            margin-bottom: 20px;
        }

        h1 {
            color: var(--dark);
            margin-bottom: 10px;
            font-size: 1.8rem;
        }

        .subtitle {
            color: var(--gray-600);
            margin-bottom: 30px;
        }

        .form-group {
            margin-bottom: 20px;
            text-align: right;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--dark);
        }

        .input-field {
            width: 100%;
            padding: 15px;
            border: 2px solid var(--gray-200);
            border-radius: 12px;
            font-size: 1rem;
            transition: all 0.3s ease;
        }

        .input-field:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
        }

        .btn {
            width: 100%;
            padding: 15px;
            background: var(--primary);
            color: var(--white);
            border: none;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-bottom: 20px;
        }

        .btn:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
        }

        .links {
            margin-top: 20px;
        }

        .links a {
            color: var(--primary);
            text-decoration: none;
            margin: 0 10px;
        }

        .links a:hover {
            text-decoration: underline;
        }

        .message {
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 20px;
            display: none;
        }

        .success {
            background: var(--success);
            color: var(--white);
        }

        .error {
            background: var(--error);
            color: var(--white);
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">🔐</div>
        <h1>تسجيل الدخول</h1>
        <p class="subtitle">أدخل بريدك الإلكتروني المسجل</p>

        <form id="loginForm">
            <div class="form-group">
                <label for="email">البريد الإلكتروني</label>
                <input type="email" id="email" name="email" class="input-field" placeholder="your@email.com" required>
            </div>

            <div id="successMessage" class="message success">
                ✅ تم الدخول بنجاح!
            </div>

            <div id="errorMessage" class="message error">
                ❌ البريد الإلكتروني غير مسجل
            </div>

            <button type="submit" class="btn">تسجيل الدخول</button>
        </form>

        <div class="links">
            <a href="signup.html">إنشاء حساب جديد</a>
            <a href="https://carvfi-web3-social.vercel.app/">الرئيسية</a>
        </div>
    </div>

    <script>
        const API_URL = 'https://script.google.com/macros/s/AKfycbxwqqYOry43uTlUkXRliqGEbB_7sC-OBvZ-FxGnwCqNx4jKiio7HGvbiMFGEnYoxa6z1A/exec';

        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const button = this.querySelector('button');
            const originalText = button.textContent;
            
            button.disabled = true;
            button.textContent = 'جاري الدخول...';
            
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('errorMessage').style.display = 'none';
            
            try {
                const response = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
                const result = await response.json();
                
                if (result.success) {
                    // حفظ بيانات المستخدم
                    localStorage.setItem('carvfi_user', JSON.stringify(result.data.user));
                    localStorage.setItem('user_logged_in', 'true');
                    
                    document.getElementById('successMessage').style.display = 'block';
                    
                    // توجيه للصفحة الرئيسية
                    setTimeout(() => {
                        window.location.href = 'https://carvfi-web3-social.vercel.app/';
                    }, 1500);
                } else {
                    document.getElementById('errorMessage').style.display = 'block';
                }
            } catch (error) {
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('errorMessage').textContent = '❌ خطأ في الاتصال';
            } finally {
                button.disabled = false;
                button.textContent = originalText;
            }
        });

        // تحميل بيانات المستخدم إذا كان مسجلاً
        window.addEventListener('load', function() {
            const savedUser = localStorage.getItem('carvfi_user');
            if (savedUser) {
                // توجيه فوري إذا كان مسجلاً
                window.location.href = 'https://carvfi-web3-social.vercel.app/';
            }
        });
    </script>
</body>
</html>