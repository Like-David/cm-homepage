export const RANK_ORDER = ['대표이사', '상무', '이사', '차장', '과장', '대리', '사원', '인턴'];

export const EMPLOYEES = [
    { name: '권정훈', rank: '대표이사', department: '주식회사 씨엠이노베이션', duties: '총괄 및 개발',   email: 'gonni2000@cminnovation.co.kr', ext: '-' },
    { name: '유지훈', rank: '상무',     department: '주식회사 씨엠이노베이션', duties: '영업 및 기술지원', email: 'miljjang@cminnovation.co.kr',   ext: '-' },
    { name: '김준식', rank: '이사',     department: '개발 1팀',               duties: '개발',            email: 'junsika@cminnovation.co.kr',   ext: '-' },
    { name: '최은지', rank: '이사',     department: '경영지원팀',             duties: '인사, 총무',       email: 'eunji@cminnovation.co.kr',     ext: '-' },
    { name: '김효진', rank: '차장',     department: '개발 3팀',               duties: '개발',            email: 'khj4323@cminnovation.co.kr',   ext: '-' },
    { name: '윤홍민', rank: '차장',     department: '개발 2팀',               duties: '개발 및 기술지원', email: 'kamadama@cminnovation.co.kr',  ext: '-' },
    { name: '김병찬', rank: '과장',     department: '솔루션 지원팀',          duties: '개발 및 기술지원', email: 'bckim@cminnovation.co.kr',     ext: '-' },
    { name: '박두리', rank: '과장',     department: '개발 1팀',               duties: '개발',            email: 'pdr@cminnovation.co.kr',       ext: '-' },
    { name: '박수현', rank: '대리',     department: '개발 1팀',               duties: '개발',            email: 'yakup1@cminnovation.co.kr',    ext: '-' },
    { name: '신욱진', rank: '대리',     department: '개발 2팀',               duties: '개발',            email: 'sjjj3333@cminnovation.co.kr',  ext: '-' },
    { name: '엄성규', rank: '사원',     department: '개발 3팀',               duties: '개발 및 기술지원', email: 'seonggyu@cminnovation.co.kr',  ext: '-' },
    { name: '이지민', rank: '사원',     department: '솔루션 지원팀',          duties: '개발 및 기술지원', email: 'leejimin00@cminnovation.co.kr', ext: '-' },
    { name: '최영재', rank: '사원',     department: '개발 3팀',               duties: '개발',            email: 'dudwoeoahs@cminnovation.co.kr', ext: '-' },
    { name: '고대현', rank: '인턴',     department: '솔루션 지원팀',          duties: '개발 및 기술지원', email: 'asfdbw01@cminnovation.co.kr',  ext: '-' },
    { name: '노윤영', rank: '인턴',     department: '경영지원팀',             duties: '경영지원 및 전화응대', email: 'yy0720@cminnovation.co.kr', ext: '-' },
];

// 직급순(높은 순) → 이름순 정렬
export const SORTED_EMPLOYEES = [...EMPLOYEES].sort((a, b) => {
    const rankDiff = RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank);
    if (rankDiff !== 0) return rankDiff;
    return a.name.localeCompare(b.name, 'ko');
});

export const findByEmail = (email) =>
    EMPLOYEES.find((e) => e.email === email) ?? null;

export const findByName = (name) =>
    EMPLOYEES.find((e) => e.name === name) ?? null;
