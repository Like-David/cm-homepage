export const showSolutionPopup = async function(data) {
    let pw, ph;
    pw = Math.min(1200, Math.max(920, Math.round(screen.width * 0.60)));
    ph = Math.round(screen.height * 0.9);
    const pl = Math.round((screen.width - pw) / 2);
    const pt = Math.round((screen.height - ph) / 2);
    const newWindow = window.open('', 'solutionPopup', `width=${pw},height=${ph},left=${pl},top=${pt},scrollbars=yes,resizable=yes`);

    if (!newWindow) {
        alert('팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도해주세요.');
        return;
    }

    // For rx-cert: issue a cert record in the DB and get a UUID for the QR
    let verifyId = null;
    if (data.solutionId === 'rx-cert') {
        try {
            const resp = await fetch('/api/cert-verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: data.name, accNo: data.accNo, nowDate: data.nowDate }),
            });
            if (resp.ok) {
                const json = await resp.json();
                verifyId = json.id;
            }
        } catch (e) {
            console.warn('cert-verify API error:', e);
        }
    }

    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    const eformBase = import.meta.env.VITE_EFORM_BASE_URL || '';
    let actionUrl = '';
    switch (data.solutionId) {
        case 'report-express':
            actionUrl = `${eformBase}/eform-demo/cdoc/eform/homepage/rxEForm/rxEForm.jsp`;
            break;
        case 'rx-cert':
            actionUrl = `${eformBase}/eform-demo/cdoc/eform/homepage/rxCertDemo/rxCertDemo.jsp`;
            break;
        case 'rx-loan':
            actionUrl = `${eformBase}/eform-demo/cdoc/eform/homepage/rxLoan/rxLoan.jsp`;
            break;
        default:
            actionUrl = `${eformBase}/eform-demo/cdoc/eform/homepage/rxEnt/rxEnt.jsp`;
    }
    form.setAttribute('action', actionUrl);
    form.setAttribute('target', 'solutionPopup');

    const addHidden = (name, value) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', name);
        input.setAttribute('value', value);
        form.appendChild(input);
    };

    for (const key in data) {
        if (data.hasOwnProperty(key) && key !== 'solutionId') {
            addHidden(key, data[key]);
        }
    }

    if (verifyId) {
        addHidden('verifyId', verifyId);
        addHidden('verifyBaseUrl', window.location.origin);
    }

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}
