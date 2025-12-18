// 1. 반드시 ' ' 따옴표 안에 주소를 넣으세요.
// 주소 끝이 pub?output=csv 로 끝나는지 꼭 확인하세요!
const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTIepAzwHme1ArBFfogzbBZiqqx0Fmz-8qpt3teRp3kLWhp3m8Frdj5-UgYy0fwtqoebtFmfIcZAfs2/pub?gid=0&single=true&output=csv';

async function fetchSheetData() {
    try {
        console.log("데이터를 불러오는 중..."); // 진행 상황 확인용
        const response = await fetch(CSV_URL);
        
        if (!response.ok) throw new Error("네트워크 응답이 좋지 않습니다.");
        
        const data = await response.text();
        console.log("데이터 로드 완료!");
        
        const allData = parseCSV(data);
        renderTable(allData);
        
    } catch (error) {
        console.error("에러 발생 구역:", error);
        document.getElementById('tableBody').innerHTML = `<tr><td colspan="6">에러 발생: ${error.message}</td></tr>`;
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split(/\r?\n/);
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });
        return obj;
    });
}

// 초기 실행
fetchSheetData();

// ... (renderTable 함수는 이전과 동일)