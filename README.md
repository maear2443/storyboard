<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 두 세계의 약속 - 스토리보드

**나노바나나(Nanobanana)** 기반 스토리보드 제작 도구입니다. Google Gemini AI를 활용하여 시나리오를 시각화하고, 완성된 스토리보드를 다운로드할 수 있습니다.

## ✨ 주요 기능

- 🎨 **AI 이미지 생성**: Google Gemini 2.5 Flash Image 모델을 사용한 씬 이미지 생성
- 💾 **API 키 저장**: 브라우저 로컬스토리지에 안전하게 API 키 저장
- 📥 **다운로드 기능**:
  - HTML 형식 (이미지 포함) - 완전한 스토리보드를 하나의 HTML 파일로
  - JSON 형식 (데이터만) - 씬 데이터와 프롬프트 정보
  - 인쇄/PDF - 브라우저 인쇄 기능을 통한 PDF 저장
- 🎬 **섹션별 관리**: 스토리보드를 섹션별로 구분하여 관리
- ⚡ **자동 생성**: 한 번의 클릭으로 전체 섹션의 이미지를 순차적으로 생성

## 🚀 바로 사용하기

**빌드 도구 필요 없음!** 순수 HTML 파일로 작동합니다.

### 방법 1: 로컬에서 바로 열기

1. `standalone.html` 파일을 브라우저로 드래그 앤 드롭
2. 설정 버튼(⚙️)을 클릭하여 Google Gemini API 키 입력
   - API 키는 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 무료로 발급
3. 바로 사용 시작!

### 방법 2: GitHub Pages로 배포

**npm install, build 없이 즉시 배포!**

1. GitHub 저장소 설정으로 이동: **Settings** → **Pages**

2. **Source** 섹션에서:
   - **Branch**: `main` (또는 `master`) 선택
   - **Folder**: `/docs` 선택
   - **Save** 클릭

3. 몇 분 후 배포 완료!
   - `https://[username].github.io/storyboard/`

### 업데이트 방법

HTML 수정 후:
```bash
git add docs/
git commit -m "Update storyboard"
git push
```

GitHub Pages가 자동으로 업데이트됩니다.

## 📖 사용 방법

1. **API 키 설정**: 우측 상단의 설정(⚙️) 버튼을 클릭하여 Gemini API 키를 입력합니다.

2. **이미지 생성**:
   - 개별 씬 생성: 각 씬 카드의 "Generate" 버튼 클릭
   - 섹션 일괄 생성: "Visualize Section" 버튼으로 현재 탭의 모든 씬 생성

3. **스토리보드 다운로드**:
   - **Download** 버튼을 클릭하여 원하는 형식 선택
   - **HTML**: 모든 이미지가 임베딩된 완전한 스토리보드 문서
   - **JSON**: 씬 데이터와 프롬프트 정보만 포함
   - **Print/PDF**: 브라우저 인쇄 대화상자를 통해 PDF로 저장

## 🛠️ 기술 스택

- **Frontend**: React 19 (CDN 로드 via ESM)
- **AI**: Google Gemini 2.5 Flash Image
- **Deployment**: GitHub Pages (순수 HTML)
- **No Build Tools**: npm, Vite, Webpack 등 불필요!

## 💡 특징

- ✅ **빌드 과정 없음**: 단일 HTML 파일로 완결
- ✅ **의존성 설치 불필요**: CDN에서 모든 라이브러리 로드
- ✅ **즉시 실행 가능**: 브라우저에서 바로 열기만 하면 됨
- ✅ **GitHub Pages 최적화**: docs 폴더에 바로 배포

## 📝 파일 구조

```
storyboard/
├── standalone.html       # 메인 애플리케이션 (모든 기능 포함)
└── docs/
    └── index.html       # GitHub Pages용 (standalone.html 복사본)
```

## 🔗 참고 링크

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API 문서](https://ai.google.dev/docs)
- 원본 앱: https://ai.studio/apps/drive/116YZf3nw2uMeJv4Q_dhYjJxTnuOWXVOR

---

<div align="center">
<strong>No npm. No build. Just HTML. 🚀</strong>
</div>
