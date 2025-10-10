# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# React 프로젝트 구조 및 개발 가이드

## 📂 폴더 구조

```
my-app/
├── public/                # 정적 파일 (favicon, robots.txt 등)
├── src/
│   ├── assets/            # 이미지, 폰트, css 등 리소스
│   ├── components/        # 재사용 가능한 UI 컴포넌트
│   ├── pages/             # 페이지 단위 컴포넌트
│   ├── layouts/           # 레이아웃 (공통 헤더/푸터)
│   ├── hooks/             # 커스텀 훅
│   ├── contexts/          # Context API (전역 상태)
│   ├── elements/          # 페이지 안 요소 컴포넌트
│   ├── services/          # API 호출, axios 등 네트워크
│   ├── utils/             # 유틸 함수
│   ├── styles/            # 공통 스타일 (전역 CSS 등)
│   ├── App.jsx            # 루트 컴포넌트
│   ├── main.jsx           # 진입점
│   └── router/            # 라우팅 관련 코드
```

---

## ⚙️ 주요 개념 정리

### 1. 커스텀 훅 (Custom Hooks)
- 반복되는 로직을 분리해서 재사용할 수 있게 만든 함수
- `use` 로 시작해야 하며 내부적으로 React 훅을 사용할 수 있음

**예시 (`src/hooks/useFetch.js`)**
```javascript
import { useState, useEffect } from "react";
import axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
};
```

---

### 2. Context API (전역 상태 관리)
- 전역적으로 상태를 관리할 때 사용
- Redux 같은 라이브러리를 쓰지 않고도 간단하게 글로벌 상태 관리 가능

**예시 (`src/contexts/UserContext.jsx`)**
```javascript
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 커스텀 훅으로 사용하기
export const useUser = () => useContext(UserContext);
```

---

### 3. API 호출 / 네트워크 (axios 활용)
- 네트워크 통신은 `services/` 폴더에서 관리
- axios 인스턴스를 만들어두면 여러 API 호출 시 공통 설정을 적용할 수 있음

**예시 (`src/services/api.js`)**
```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com", // 공통 API 주소
  timeout: 5000,
});

// 예시 API 함수
export const getPosts = () => api.get("/posts");
```

---

### 4. 실제 사용 예시

**페이지 컴포넌트 (`src/pages/PostList.jsx`)**
```javascript
import { useEffect, useState } from "react";
import { getPosts } from "../services/api";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((res) => setPosts(res.data));
  }, []);

  return (
    <div>
      <h1>게시글 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
```

---

## 🚀 요약
- **hooks/**: 커스텀 훅으로 로직 재사용 (`useFetch` 등)
- **contexts/**: Context API 로 전역 상태 관리 (`UserContext`)
- **services/**: axios 인스턴스를 이용해 API 호출 관리
- **pages/** + **components/**: 페이지/컴포넌트 단위로 UI 구성

이 구조를 사용하면 **유지보수성**과 **확장성**이 좋아지고, 다른 개발자와 협업할 때도 직관적으로 이해할 수 있습니다.  
