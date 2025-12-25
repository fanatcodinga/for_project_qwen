document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const generateBtn = document.getElementById('generateBtn');
    const qrContainer = document.getElementById('qrContainer');
    
    // Функция для генерации QR-кода
    function generateQRCode() {
        const url = urlInput.value.trim();
        
        if (!url) {
            alert('Пожалуйста, введите действительную ссылку');
            return;
        }
        
        // Проверка корректности URL
        try {
            new URL(url);
        } catch (e) {
            alert('Пожалуйста, введите действительный URL-адрес');
            return;
        }
        
        // Очистка предыдущего QR-кода
        qrContainer.innerHTML = '';
        
        // Создание контейнера для QR-кода
        const qrDiv = document.createElement('div');
        qrDiv.id = 'qrcode';
        qrDiv.style.display = 'flex';
        qrDiv.style.flexDirection = 'column';
        qrDiv.style.alignItems = 'center';
        qrContainer.appendChild(qrDiv);
        
        // Генерация QR-кода
        new QRCode(qrDiv, {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
        
        // Добавление кнопки для скачивания QR-кода
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Скачать QR-код';
        downloadBtn.style.marginTop = '20px';
        downloadBtn.style.padding = '10px 20px';
        downloadBtn.style.backgroundColor = '#ff9f00';
        downloadBtn.style.color = '#000';
        downloadBtn.style.border = 'none';
        downloadBtn.style.borderRadius = '8px';
        downloadBtn.style.cursor = 'pointer';
        downloadBtn.style.fontSize = '16px';
        downloadBtn.style.fontWeight = 'bold';
        
        downloadBtn.addEventListener('click', function() {
            const canvas = qrDiv.querySelector('canvas');
            if (canvas) {
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            }
        });
        
        qrContainer.appendChild(downloadBtn);
    }
    
    // Обработчик кнопки
    generateBtn.addEventListener('click', generateQRCode);
    
    // Обработчик нажатия Enter в поле ввода
    urlInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            generateQRCode();
        }
    });
});