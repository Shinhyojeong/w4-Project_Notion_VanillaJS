# w4-Project_Notion_VanillaJS

## 필수 요구사항

바닐라 JS만을 이용해 노션을 클로닝합니다.

기본적인 레이아웃은 노션과 같으며, 스타일링, 컬러값 등은 원하는대로 커스텀합니다.

* 글 단위를 Document라고 합니다. Document는 Document 여러개를 포함할 수 있습니다
* [x] 화면 좌측에 Root Documents를 불러오는 API를 통해 루트 Documents를 렌더링합니다.
  * [x] Root Document를 클릭하면 오른쪽 편집기 영역에 해당 Document의 Content를 렌더링합니다.
  * [x] 해당 Root Document에 하위 Document가 있는 경우, 해당 Document 아래에 트리 형태로 렌더링 합니다.
  * [x] Document Tree에서 각 Document 우측에는 + 버튼이 있습니다. 해당 버튼을 클릭하면, 클릭한 Document의 하위 Document로 새 Document를 생성하고 편집화면으로 넘깁니다.
  * [ ] 루트 문서를 추가하는 버튼. 클릭하면 새 루트 문서를 추가하고 편집화면으로 넘긴다.
* [ ] 편집기에는 기본적으로 저장 버튼이 없습니다. Document Save API를 이용해 지속적으로 서버에 저장되도록 합니다.
* History API를 이용해 SPA 형태로 만듭니다.
  * [x] 루트 URL 접속 시엔 별다른 편집기 선택이 안 된 상태입니다.
  * [x] `/documents/{documentId}` 로 접속시, 해당 Document 의 content를 불러와 편집기에 로딩합니다.

## 보너스 요구사항

* 기본적으로 편집기는 textarea 기반으로 단순한 텍스트 편집기로 시작하되, 여력이 되면 div와 contentEditable을 조합해서 좀 더 Rich한 에디터를 만들어봅니다.
* 편집기 최하단에는 현재 편집 중인 Document의 하위 Document 링크를 렌더링하도록 추가합니다.
* 편집기 내에서 다른 Document name을 적은 경우, 자동으로 해당 Document의 편집 페이지로 이동하는 링크를 거는 기능을 추가합니다.
* 그외 개선하거나 구현했으면 좋겠다는 부분이 있으면 적극적으로 구현해봅니다!
## 과제 진행 노트

작업 순서:

1. Set up
2. 문서 목록 보여주기
   1. components
      1. `DocumentsPage`
         1. role
            1. UI 컴포넌트의 상위 컴포넌트로서 UI 컴포넌트에 필요한 데이터를 제공한다
            2. 여기서 문서 목록 UI 컴포넌트는 문서 목록 데이터가 필요한데 해당 데이터는 API 요청을 통해 얻을 수 있으므로 페이지 컴포넌트가 내부적으로 API를 실행한다
         2. state
            1. 페이지 컴포넌트 내부적으로 데이터 관리를 할 수 있으므로 외부의 데이터가 필요 없다. 따라서 state, initialState, setState 메서드 모두 불필요하다.
         3. render
            1. 렌더할 때마다
               1. API 데이터를 갱신해서
               2. 하위 UI 컴포넌트에 전달한 후 (뷰가 변경된다)
               3. (뷰가 변경되었으므로) 상위 컴포넌트에 다시 append한다
      2. `DocumentList`
         1. role
            1. UI 컴포넌트로서 상위 컴포넌트로부터 데이터를 받아 렌더링을 한다
         2. state
            1. state: 상위 컴포넌트가 전달한 데이터(=문서 목록)
            2. setState: 다음 상태를 현재 상태로 반영하고, 상태가 변경되었으므로 렌더 함수를 실행한다
         3. render
            1. 상태 데이터를 보여준다
            2. 문서 목록이 있으면 보여주고, 없으면 없다는 메시지를 보여준다
   2. services
      1. `api.js`: 데이터 요청 API를 한곳에서 관리한다
3. 편집기 보여주기
   1. components
      1. `EditorPage`
         1. role
            1. UI 컴포넌트의 상위 컴포넌트로서 UI 컴포넌트에 필요한 데이터를 제공한다
            2. 문서 데이터는 문서 ID에 따라 달라지는데, URL에 따라 문서 ID가 달라지므로 외부에서 주입해주는 경우가 있다
         2. state
            1. initialState: 
               1. id
               2. title
               3. content
               4. documents ??
            2. setState: 아이디가 변경되면 나머지 state도 따라서 변경시켜서 UI 컴포넌트에 전달한다
         3. render
            1. 변경된 상태를 반영하기 위해 상위 컴포넌트에 다시 append한다
      2. `Editor`
         1. role
            1. UI 컴포넌트
         2. state
            1. state:
               1. id
               2. title
               3. content
               4. documents ??
            2. setState:
               1. 상태 업데이트 후 리렌더
         3. render
            1. 상태 데이터를 보여준다
         4. event
            1. keyup
               1. state 변수인 title과 content를 각각 업데이트 한다
         5. 유저 시나리오에 따른 기능 구현
            1. `임시 저장하기`
               1. key up 이벤트 => onEditing() => setItem()
            2. `임시 저장 불러오기`
               1. 새로고침 하면 임시 저장 데이터를 불러온다 => 새로고침이라는 것은 에디터를 최초 렌더링하는 상황 => 처음 그리는 순간인 new 연산할 때 initialState에 불러온 데이터를 전달한다 => `new Editor({ ..., initialState: tempDoc })` 
4. 문서 클릭하면 해당하는 문서 내용으로 편집기 보여주기
   1. 시나리오
      1. (`App`, `DocsPage`, `DocsList`)
         1. `App`이 `DocsPage`부터 `DocList`까지 onClickDoc 메서드를 전달한다.
         2. `DocList`는 문서가 클릭되면 해당 문서의 id를 담아서 onClickDoc(id)를 실행한다
         3. `App`은 onClickDoc이 실행되면 this.setState를 실행해서 상태(this.state.selectedDoc.id)를 업데이트한다
         4. `App`의 상태가 this.setState로 업데이트 되면서 EditorPage의 상태를 selectedDoc으로 업데이트한다
            1. `editorPage.setState(this.state.selectedDoc);`
      2. (`App`, `EditorPage`, `Editor`)
         1. `EditorPage.setState`
            1. `EditorPage`가 `App`으로부터 id를 전달받는 것은 setState 함수에서 일어난다. 참고로 `EditorPage`의 최초 this.sate.id는 null로 되어 있으므로 App에서 id를 전달할 때는 id가 변경되는 상황인 것이다.
            2. 이렇게 요청 받은 id가 현재 상태와 다른 경우에는 새로 데이터를 불러오고 같은 경우에는 데이터를 불러올 필요가 없으므로 분기문을 만든다. `this.state.id !== nextState.id`
            3. 이제 nextState의 id와 this.state.id가 다른 경우에 한해서 진행한다. 새로 받은 id를 this.state에 업데이트를 하고, 이제 업데이트된 id에 해당하는 문서 데이터를 가져와야 한다. 따라서 `this.state = nextState`로 상태를 업데이트하고, 문서 데이터를 가져오는 것은 `fetchDoc`이라는 함수를 분리해서 진행한다.
         2. `fetchDoc`:
            1. `fetchDoc`은 아무 때나 실행되는 게 아니라, 현재 상태의 id와 다음 상태의 id가 이미 다른 경우가 전제된 상태에서 실행되고 있다는 것을 내포하고 있다. 이 맥락을 기억해야 전체 코드 흐름을 파악하기 쉽다.
            2. id가 변경되었으므로 새로운 문서 데이터를 가져온다. 새로운 문서 데이터 가져오는 것을 `fetchDoc` 함수를 만들어서 한다. `fetchDoc`은 새로운 문서 데이터를 불러왔으므로 내부 코드에서 setState 함수를 실행해서 상태를 업데이트 한다.
         3. `EditorPage.setState`:
            1. 다시 setState로 왔는데 이제 nextState.id와 this.statet.id 값의 일치 여부를 판단하는 분기문에서 값이 일치하는 분기문으로 빠진다. 왜냐하면 fetchDoc을 실행하기 전에 `this.state = nextState`로 업데이트 되었기 때문이다.
            2. 이제 분기문에 의해 `Editor.setState` 를 실행해서 편집기 화면을 업데이트한다.
5. 편집기에서 수정하면 DB에 업데이트하기
   1. `EditorPage`
      1. 편집 중임을 알고 있는 onEditing 함수에서 로컬 스토리지에 저장한 후 update API를 통해 DB에 업데이트한다. DB 업데이트가 끝나면 로컬 스토리지에 저장된 내용을 삭제한다.
6. 편집기에 수정한 내용이 DB 내용보다 최신인 경우 사용자가 원하는 것으로 불러올 수 있도록 제안하기
   1. `EditorPage`
      1. 어떤 경우에 발생하는가?
         1. 로컬스토리지에 저장하고 나서 DB에는 아직 저장을 안 했는데 사용자가 새로고침하는 상황에서 발생할 수 있다
      2. 어떻게 처리하는가?
         1. 맥락
            1. App에 의해 doc.id가 전달되어서 EditorPage.setState 메서드가 실행되면
            2. initialState.doc.id와 다르기 때문에 fetchDoc을 하게 된다
         2. 처리
            1. fetchDoc을 할 때 로컬 스토리지에 저장된 tempDoc.tempSavedDate과 DB의 doc.updatedAt을 비교해서 로컬이 더 최신일 경우 사용자에게 confirm 메시지를 질문해서 원하는 대로 처리하게 한다
7. 라우팅 처리
   1. 패턴
      1. rootDoc을 클릭하면 url을 변경해서 편집기에 내용이 보이도록 한다
         1. url이 변경되면 자동으로 편집기의 내용이 url에 담긴 doc.id를 반영하도록 한다
         2. 즉 url 패턴에 따라 달라지는 것은 EditorPage 뿐이다. DocsPage는 변경되지 않는다.
   2. 라우팅 구현 로직
      1. url 파싱
         1. `const { pathname } = window.location;`
   3. 라우팅 언제 실행
      1. 이벤트 바인딩
         1. url이 바뀌는 이벤트를 window가 리스닝하고 있어야 한다
      2. 이벤트 디스패치
         1. url이 바뀌는 이벤트를 커스텀 이벤트로 만들어서 디스패치 하도록 한다
   4. 라우터 모듈
      1. 위 내용을 바탕으로 하면 url이 바뀌는 이벤트를 디스패치 하는 메서드가 필요하다. 이를 `push` 함수로 모듈화한다
      2. 라우터가 처음 실행되면 push된(커스텀 이벤트가 디스패치된) 이벤트에 대한 리스닝을 시작해야 한다. 이를 `initRouter` 함수로 모듈화한다. `initRouter`는 App에서 만든 라우팅 규칙(`App.route`)을 `onRoute` 인자로 받아서 라우트 변경 이벤트가 발생하면 `onRoute`를 실행하도록 한다.
   5. 라우터 모듈 사용하기
      1. 기존에 onClickDoc은 문서 목록에서 특정 문서가 클릭되었을 때 편집기에 해당 문서 id를 전달하기 위해서 쓰였다. 이 과정은 컴포넌트 계층을 파이프처럼 타고 흘러가면서 이루어졌다.
      2. 그러나 이제 라우팅을 이용하면 전체 앱인 window에 이벤트 바인딩 되어 있기 때문에 컴포넌트 계층 구조를 탈 필요가 없다.
      3. 따라서 컴포넌트 계층 구조에 흐르고 있던 onClickDoc을 없애고 해당 컴포넌트에만 push 메서드로 사용하도록 대체한다.
   6. 예외 처리
      1. Q. 해당 x-username으로 존재하지 않는 문서 id로 접근할 경우?
         1. 해당 문서 id가 어떤 x-username에 속하는지를 알 길이 없다. 애초에 노션 클로닝이기 때문에 다른 유저의 문서를 접근한다는 게 말이 안된다. 그러므로 존재하지 않는 문서 id라는 것을 사용자에게 알려주는 식으로 처리한다.
         2. 그런데 생각해보니 이게 존재하지 않는 id여서 api 오류가 발생하는 건지 아니면 서버 상의 시스템 오류로 api 오류나는 건지 프론트 측에서는 알 길이 없다. 따라서 그냥 일반적인 관점으로 API 호출 오류를 내뱉도록 한다.
8. `DocList` 리팩터
   1. 리팩터 이유?
      1. 코드가 중복된다. DRY 규칙을 따르도록 리팩터한다.
   2. 리팩터 아이디어
      1. as-is
         1. DocsPage
            1. DocsList
               1. SubDocList
      2. to-be
         1. DocsPage
            1. DocsTree
               1. RootDocList(DocList + event binding)
                  1. DocList
   3. 리팩터 액션 플랜
      1. DocList 이름을 DocsTree로 변경한다
      2. SubDocList 이름을 DocList로 변경한다
      3. DocsTree에서 마크업 부분을 DocList에게 맡기고 이벤트 바인딩만 한다
      4. DocsTree 내부에서 new DocList로 만든 인스턴스 변수를 rootDocList라고 명시적으로 표기한다.
         1. 똑같은 DocList 컴포넌트로 만들어졌어도 rootDocList에는 이벤트가 바인딩되고 subDocList(rootDocList의 이벤트 바인딩 코드에서 실행하는 new DocList 지칭)에는 이벤트가 바인딩 되지 않는 차이점을 조금이라도 더 드러내기 위함이다.
   4. 리팩터 후 동작 방식
      1. DocsPage는 DocsTree를 렌더한다
      2. DocsTree는 `new DocList`(UI component) 연산으로 rootDocList를 렌더한다
      3. DocsTree는 이벤트 바인딩 되어 있고 콜백을 트리거한다.
         1. 콜백은 라우터 push를 실행한다
         2. 콜백은 `new DocList` 연산으로 subDocList를 렌더한다
   5. 리팩터 효과
      1. UI 컴포넌트가 완전히 분리되었다 => `DocList.js`
      2. API 호출하여 트리 내에 새로운 문서 추가, 문서 트리 업데이트를 위한 이벤트 바인딩 같은 좀 더 비즈니스 로직에 가까운 것들은 모두 `DocsTree`로 분리되었다.
      3. 즉 관심사 분리가 더 잘 되었다
9. 하위 문서 추가하기
   1. 리팩터 후 추가
       1. 이벤트 로직 파악
          1. 이벤트 타겟은 기본적으로 li로 태깅된 targetDoc을 먼저 찾는다
          2. li로 태깅된 targetDoc이 없으면 콜백함수를 종료하도록 방어 코드를 넣는다
          3. 이제 targetDoc이 클릭되면 push 메서드로 라우팅 처리하고 편집기에 해당 문서의 내용을 불러온다
          4. fold 버튼이 클릭되면 subdocs를 불러오고 버튼을 토글한다
       2. 네이밍 변경
          1. `$li` to `targetDoc`
             1. `$li = e.target.closest('li')`를 코드 읽을 때 가독성을 높이기 위해 **도메인 연관성을 더 높이는 방식으로 좀 더 추상화**하여 `targetDoc = e.target.closest('li')`로 한다. 이제 이 코드를 읽으면 클릭된 li 요소보다는 클릭된 "문서"라는 것을 바로 알 수 있다. 
          2. Add `$eventTarget`
             1. 클릭된 문서를 편집기로 푸시하는 로직은 끝났기 때문에 남은 로직은 버튼 로직 뿐이다. 따라서 어떤 버튼이 클릭되었는지 알아야 한다. 그러면 여기서는 버튼이라는 DOM node를 판별하는 로직이 필요하다. 따라서 도메인 로직보다 좀 더 추상화 레벨이 낮으므로 `$eventTarget`처럼 DOM element로 네이밍을 한다.
       3. 선언형 코드
          1. `toggleFoldButton`
             1. 버튼의 클래스가 unfold, 즉 하위 문서를 펼쳐야 하는 unfold button이면 unfold 하도록 한다. (fold도 마찬가지)
                1. 실제 구현 내용은 버튼의 textContent와 class명을 바꿔야 하는데 이를 함수 이름으로 추상화한다
          2. `renderSubDocList`
             1. 하위 문서 목록을 렌더링 하는 함수이다. 역시 함수 이름으로 추상화했다.
                1. 실제 로직: 클릭 된 targetDoc에 대한 하위 문서를 불러와야 하므로 targetDoc의 id를 추출해서 해당 id의 하위 문서를 알 수 있는 API를 호출한다. 응답으로 받은 subdocs 목록을 문서 목록을 그려주는 UI 컴포넌트인 DocList의 initialState로 전달해서 하위 문서를 렌더링한다.
          3. `unfoldSubDocList`
             1. 하위 문서를 unfold 한다. unfold 버튼이 클릭되었을 때 버튼의 UI를 토글(`toggleFoldButton`)하고 하위 문서를 렌더링(`renderSubDocList`)를 함께 동작시키는 추상화 함수이다.
          4. `refreshSubDocList`
             1. 추가(+) 버튼이 클릭되었을 때 새 하위 문서를 문서 트리에 렌더링하는 함수이다.
                1. 실제 로직: 클릭된 targetDoc이 접혀 있으면 하위 문서를 렌더링하고, 펼쳐 있으면 이미 렌더링된 하위 문서 목록을 지우고, 새롭게 불러온 하위 문서 목록으로 다시 렌더링한다


## 트러블슈팅

- Q. 텍스트 편집기에 타이핑을 계속 하려는데 포커싱이 해제되고 자꾸 멈춘다면 무엇 때문일까?
  - 텍스트 편집 요소의 innerHTML을 지웠다가 그렸다가 하면 자꾸 멈추는 현상이 발생한다
  - innerHTML은 한 번만 그려야 타이핑을 계속 할 수 있다
- Q. DOM 스타일링을 JS 오브젝트로 하는 방법?
  - Object.assign(arg1, arg2): Object.assign은 arg1에 arg2를 합친다 - [stackoverflow](https://stackoverflow.com/questions/32933985/apply-object-of-style-to-dom-element) 
* Q. 로컬스토리지에 저장한 데이터가 DB에 저장한 데이터보다 더 최신인 경우는 어떤 상황에서 발생하는가?
  * 로컬스토리지에 저장하고 나서 DB에는 아직 저장을 안 했는데 사용자가 새로고침하는 상황에서 발생할 수 있다
* Q. 다음 코드 맥락을 보고 true/false 예측
  * `const $li = e.target.closest('li');`
  * `console.log($li === e.target);`
    * true
