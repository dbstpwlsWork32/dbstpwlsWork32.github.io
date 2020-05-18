import * as React from 'react'
import './main.sass'
import nodejsLogo from '../../assets/nodejs-logo.png'

const Main = () => (
  <main>
    <section className="b__content-box main__intro-card-wrapper">
      <h2 className="text__title-1 main__intro-card-wrapper__title">- INTRODUCE -</h2>
      <article className="main__intro-card">
        <h3 className="main__intro-card__title text__title-2">
          <span className="main__intro-card__title__border">WHO ARE YOU?</span>
        </h3>
        <p className="main__intro-card__text">
          시맨틱 태그를 통한 웹 표준 적용 및 더 나아가 시각장애인을 위한 WAI-ARIA-ROLES 까지의 마크업,<br/>
          성능을 위해 vanillaJS로 ie9까지 지원하는 기본적인 scroll event, slider 등의 lib 제작 경험,<br/>
          실무에 적용해본적은 없지만 React, Vue.js, Typescript를 toy project로 다양하게 다뤄봤으며,<br/>
          나아가 nodejs를 통해 집에서 간단한 로컬 미디어 서버를 열어 영화시청을 하는 등<br/>
          집에있을때 컴퓨터로 뭔가를 공부하고 만드는, 프로그래밍을 취미이자 직업으로 가진 얼마전 군대만기제대한 청년입니다.
        </p>
      </article>

      <article className="main__intro-card">
        <h3 className="main__intro-card__title text__title-2">
          <span className="main__intro-card__title__border">CAREER</span>
        </h3>
        <article className="main__intro-card__split-wrapper">
          <div className="main__intro-card__split">
            <div className="main__intro-card__split__title-wrapper">
              <h4 className="main__intro-card__split__title text__title-3">두나무</h4>
              <p className="text__caption">2016.09 ~ 2017.11</p>
            </div>
            <div className="main__intro-card__split__text-wrapper">
              <ul className="main__intro-card__split__list">
                <li>기존에 운영하고 있던 회사 페이지 약 198개의 전반적인 유지보수</li>
                <li>그 외 자잘한 팝업, 광고배너 등의 템플릿을 디자이너, 기획자와 함께 제작</li>
                <li>회사 내 서비스인 upbit, 카카오스탁, map 그리고 "두나무" 메인 홈페이지 고도화 작업 및 리뉴얼</li>
              </ul>
            </div>
          </div>
          <p className="main__intro-card__split-wrapper__text text__caption text__color-error">
            페이지 내 모든 애니매이션은 ie8 이하 버전까지 지원하지 않을 시 페이지 내 성능을 위해 직접 vanillaJS로 애니매이션을 제작, 유지보수 했습니다.<br/>
            이런 노력을 인정받았는지 퍼블리싱 외적으로 받은 업무로는 월 300만원 넘게 나오던 배너 광고 서비스의 비용을 줄이고자<br/>
            자체제작 하려던 프로젝트를 맡아 제작하게된 경험이 있습니다.<br/>
            ### <a href="http://stock.kakao.com/m, http://m.finance.daum.net/" target="blank">[모바일 페이지 팝업 배너]</a> [모바일을 통해 보셔야 합니다]<br/>
            모바일 페이지에서 특정 주식 아이템(Ex: 삼성전자)으로 들어갈 경우 하단에 카카오스탁 앱 설치 팝업 띄워줌<br/>
            <a href="https://github.com/dbstpwls/dbstpwls.github.io/tree/master/popupScript" target="blank">GITHUB</a>
          </p>
        </article>
        <article className="main__intro-card__split-wrapper">
          <div className="main__intro-card__split">
            <div className="main__intro-card__split__title-wrapper">
              <h4 className="main__intro-card__split__title text__title-3">아이유아이</h4>
              <p className="text__caption">2018.02 ~ 2018.05<br/>(프리랜서)</p>
            </div>
            <div className="main__intro-card__split__text-wrapper">
              <ul className="main__intro-card__split__list">
                <li><a href="https://research.konkuk.ac.kr/" target="blank">건국대학교 산학협력단</a> 제작</li>
                <li><a href="https://capstone.konkuk.ac.kr/" target="blank">건국대학교 캡스톤</a> 제작</li>
                <li><a href="http://www.rnaanalytics.com/" target="blank">Rna analyticst</a> 제작 (회사 내부에 시각장애인 한분이 계셔서 실제 스크린리더 프로그램을 사용해 맞춘 페이지 입니다.) </li>
                <li>PHP로 만들어져있던 4개의 치과 홈페이지 유지보수</li>
              </ul>
            </div>
          </div>
        </article>
      </article>
    </section>

    <section className="b__content-box main__intro-card-wrapper">
      <h2 className="text__title-1 main__intro-card-wrapper__title">- SKILL -</h2>
      <div className="main__intro-card-image">
        <article className="main__intro-card-image__article">
          <h3 className="main__intro-card-image__title text__color-em text__title-2">MARKUP</h3>
          <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/4850de49604597.5608607aaab6c.png" alt="html5"/>
          <img src="https://lessipe.com/file/course/15451403651143.png" alt="css3"/>
          <img src="https://vanseodesign.com/blog/wp-content/uploads/2015/09/sass-logo-2.png" alt="sass"/>
          <img src="https://shs400.github.io/images/styled-components/styled-components-logo.png" alt="styled component"/>
        </article>

        <article className="main__intro-card-image__article">
          <h3 className="main__intro-card-image__title text__color-em text__title-2">JAVASCRIPT ++</h3>
          <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2370C63B5694884912" alt="javascript"/>
          <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99623E335A17DBD241" alt="javascript es6"/>
          <img src="https://image.winudf.com/v2/image1/Y2MubmV4dGxhYnMudHlwZXNjcmlwdF8yXzdfaWNvbl8xNTQ1OTMxODQ3XzA1OA/icon.png?w=170&fakeurl=1" alt="typescript" />
        </article>

        <article className="main__intro-card-image__article">
          <h3 className="main__intro-card-image__title text__color-em text__title-2">FRAMEWORK</h3>
          <img src="https://linked2ev.github.io/assets//img/vue-logo.png" alt="vuejs"/>
          <img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2FcHE8h8%2FbtquNE7RlYx%2FoYOteFEYZFCYzSYEZAeMKk%2Fimg.png" alt="react"/>
        </article>

        <article className="main__intro-card-image__article">
          <h3 className="main__intro-card-image__title text__color-em text__title-2">BACKEND</h3>
          <img src={nodejsLogo} alt="nodejs"/>
        </article>

        <article className="main__intro-card-image__article">
          <h3 className="main__intro-card-image__title text__color-em text__title-2">OTHERS</h3>
          <img src="https://seeklogo.com/images/Y/yarn-logo-F5E7A65FA2-seeklogo.com.png" alt="yarn" />
          <img src="https://seeklogo.com/images/W/webpack-logo-9E66EE203A-seeklogo.com.png" alt="webpack"/>
        </article>
      </div>
    </section>
  </main>
)

export default Main
