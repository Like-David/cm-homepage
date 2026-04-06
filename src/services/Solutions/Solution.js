export const showSolutionPopup = function(data) {
    // 1. 새 창을 엽니다. (이름을 지정해야 form의 target으로 사용할 수 있습니다)
    const newWindow = window.open('', 'solutionPopup', 'width=800,height=600,scrollbars=yes,resizable=yes');

    if (!newWindow) {
        alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
        return;
    }

    // 2. 동적으로 form을 생성합니다.
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    // Vite 프록시를 통하도록 상대 경로를 사용합니다.
    let actionUrl = '';
    switch (data.solutionId) {
        case 'report-express':
            actionUrl = 'http://localhost:8080/eform-demo/cdoc/eform/homepage/rxEnt/rxEnt.jsp';
            break;
        case 'rx-cert':
            actionUrl = 'http://localhost:8080/eform-demo/cdoc/eform/homepage/rxCert/rxCert.jsp';
            break;
        case 'rx-loan':
            actionUrl = 'http://localhost:8080/eform-demo/cdoc/eform/homepage/rxLoan/rxLoan.jsp';
            break;
        default:
            actionUrl = 'http://localhost:8080/eform-demo/cdoc/eform/homepage/rxEnt/rxEnt.jsp'; // Default case
    }
    form.setAttribute('action', actionUrl);
    form.setAttribute('target', 'solutionPopup'); // form의 제출 대상을 새 창으로 지정

    // 3. 전송할 데이터를 hidden input으로 form에 추가합니다.
    for (const key in data) {
        if (data.hasOwnProperty(key) && key !== 'solutionId') { // solutionId는 전송하지 않음
            const hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', data[key]);
            form.appendChild(hiddenField);
        }
    }

    // 4. form을 body에 추가하고 submit한 뒤, 다시 제거합니다.
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}
