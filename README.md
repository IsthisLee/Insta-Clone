# 🌠 인스타그램 클론 코딩 - Backend
인스타그램 클론 코딩 프로젝트  
<br/>
[**[Fornt-End]**](https://github.com/undriedspring/5_FE_Insta_CloneCoding) 프론트엔트 Github 페이지
<br/>
[**[Demo Video]**] 인스타그램 클론 사이트 시연 영상

<br/>

👨‍💻 프로젝트 기간 & 팀원
-------------  
- 2021년 12월 13일 ~ 2021년 12월 18일
- Front-End [이한샘](https://github.com/undriedspring), [김용성](https://github.com/YYZA)
- Back-End [김형진](https://github.com/KIMHYEONGJIN5925), [이건희](https://github.com/IsthisLee)  

<br/>

🎮 클론 인스타그램 기능  
-------------  

- 로그인 및 회원가입 기능
- 메인화면에서 다른 사람들이 올린 글 확인 가능
- 글쓰기 기능을 통해 내가 찍은 사진을 공유
- 댓글 기능을 통해 다양한 사람들과 소통
- 프로필 페이지에서 내 정보를 확인
- 좋아요 기능으로 다른 사람 글 추천

<br/>

😀 사용한 패키지 및 CSS  
-----------------
- **express**  　　　=> 웹 프레임워크
- **mongoose**　　=> 비관계형 데이터베이스인 Mongo DB를 편리하게 다룰 수 있는 ODM
- **cors**　　=> cors 해결을 위한 응답 헤더를 쉽게 추가해주는 module
- **nodemon**　　=> 파일 수정시 자동으로 서버를 재시작
- **bcrypt**　　=> 데이터베이스에 저장할 비밀번호를 암호화
- **multer**　　=> 프론트 엔드에서 보내주는 이미지 데이터(멀티파트 형식 데이터)를 받음
- **aws-sdk**　　=> node.js에서 AWS를 사용
- **multer-s3**　　=> AWS S3에 접근하여 이미지 데이터를 업로드
- **jsonwebtoken**　　=> jwt 토큰을 이용한 로그인 기능을 구현
- **cookie-parser**　　=> cookie를 가공해주어 편리하게 cookie의 data 사용 가능
- **dotenv**　　=> 환경변수 파일을 외부에 만들고, 관리가 가능
- **mongoose-sequence**　　=> db 에 data 추가 시 자동으로 idx값 생성


<br/>

📨 폴더 구조  
-----------------  

<br/>

```bash
Insta-clone
├─ node_modules
│  
│  
├─ api   ├─ middleWare
│        │  └─ authUseCookie.js
│        │  └─ multer.js
│        │ 
│        ├─ routes
│           └─ comments.js
│           └─ index.js
│           └─ posts.js
│           └─ users.js
│  
│  
├─ models
│  ├─ schema
│  └─ index.js
│  └─ posts.js
│  └─ comments.js
│  └─ users.js
│ 
│  
└─ app.js
└─ package-lock.json
└─ package.json
└─ .gitignore
└─ .env
```

<br/>

💾 DB ERD
-----------------

<br/>
<br/>

<p align="center"><img src=></p>

<br/>

📱 API
-----------------

<br/>
<br/>

<p align="center"><img src="https://user-images.githubusercontent.com/57748284/146632098-aae5ccd4-b5bd-48bd-ab4c-6d9cf674c492.png"></p>
<p align="center"><img src="https://user-images.githubusercontent.com/57748284/146632124-1acb5461-4eb7-4078-84fe-ff89c9b585c1.png"></p>
<p align="center"><img src="https://user-images.githubusercontent.com/57748284/146632121-4b0d7c8a-8c41-4f14-baba-8ff69310e227.png"></p>
<p align="center"><img src="https://user-images.githubusercontent.com/57748284/146632157-923ca9bb-90b2-44a6-a127-4ac0761cf63b.png"></p>


<br/>

🛠 Trouble Shooting
-----------------  

<br/>
<br/>

<details markdown ="1">
<summary>첫번째 문제</summary>
해결방법 블라블라
</details>
<details markdown ="2">
<summary>2</summary>
</details>

<br/>

🛠 이번 프로젝트에서 보완하거나 아쉬웠던 점 
-----------------  

<br/>
<br/>

<br/>
