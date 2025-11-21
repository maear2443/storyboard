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

## 🚀 로컬에서 실행하기

**필수 조건**: Node.js 20+

1. 의존성 설치:
   ```bash
   npm install
   ```

2. 개발 서버 실행:
   ```bash
   npm run dev
   ```

3. 브라우저에서 http://localhost:3000 열기

4. 설정 버튼(⚙️)을 클릭하여 Google Gemini API 키 입력
   - API 키는 [Google AI Studio](https://aistudio.google.com/app/apikey)에서 무료로 발급받을 수 있습니다

## 🌐 GitHub Pages로 배포하기

이 프로젝트는 간단하게 GitHub Pages로 배포할 수 있습니다.

### 배포 방법

1. 프로젝트 빌드:
   ```bash
   npm run build
   ```
   빌드된 파일은 `docs` 폴더에 생성됩니다.

2. GitHub 저장소 설정으로 이동: **Settings** → **Pages**

3. **Source** 섹션에서:
   - **Branch**: `main` (또는 `master`) 선택
   - **Folder**: `/docs` 선택
   - **Save** 클릭

4. 몇 분 후 배포 완료! 다음 URL에서 확인:
   - `https://[username].github.io/storyboard/`

### 업데이트 방법

코드 수정 후:
```bash
npm run build
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

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **AI**: Google Gemini 2.5 Flash Image
- **Deployment**: GitHub Pages + GitHub Actions

## 📝 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 🔗 참고 링크

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API 문서](https://ai.google.dev/docs)
- 원본 앱: https://ai.studio/apps/drive/116YZf3nw2uMeJv4Q_dhYjJxTnuOWXVOR
