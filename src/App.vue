<template>
  <div id="app">
    <div>
      <div class="c-header__outer">
        <div class="c-header__inner">
          <div v-if="this.$store.state.logged" class="md-layout">
            <div class="md-layout-item">
              <div class="c-title">
                League Sandbox client
              </div>
            </div>
            <div class="md-layout-item">
              <a class="c-play-button">
                Play
              </a>
            </div>
            <div class="md-layout-item" style="text-align: right;">
              Home | Lobbies | Runes | Masteries | Options
            </div>
          </div>
          <span v-else class="c-title">
            League Sandbox client
          </span>
        </div>
      </div>
      <router-view/>
      <div class="background-component bg-welcome">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
/* Define a custom web font */
@font-face {
  font-family: 'Spiegel';
  src: url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/Spiegel-Regular.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/Spiegel-Bold.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/Spiegel-RegularItalic.woff')  format('woff'),
}

@font-face {
  font-family: 'Beaufort';
  src: url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/BeaufortforLOL-Medium.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/BeaufortforLOL-Bold.woff') format('woff'), 
  url('https://s.lolstatic.com/awesomefonts/1.0.0/Fonts/BeaufortforLOL-Italic.woff')  format('woff'),
}

html {
  font-family: 'Beaufort', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #d8cfbd;
  background: #010a13;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}

body {
  color: #d5b26e;
}

.c-header__inner {
  color: #f0e6d2;
  height: 60px;
}

.c-header__outer {
  background: #010a13;
  border-bottom: 1px solid #463714;
}

.background-component{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:-100
}
.background-component.bg-welcome:before{
    content:"";
    background:url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/bg-welcome.jpg) top;
    background-size:cover;
    display:block;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    opacity:.15;
    filter:blur(8px);
}
.background-component.bg-welcome:after{
    content:"";
    background:url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/signup/en_GB/0e436452d44f9a739dfe56d0dffe6c3ca02e63b8/assets/en_GB/assets/bg-welcome.jpg) top;
    background-size:cover;
    display:block;
    opacity:0;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-button {
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-thumb {
  background: #785a28;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #c8aa6e;
}
::-webkit-scrollbar-thumb:active {
  background: #463714;
}
::-webkit-scrollbar-track {
  background: #010a13;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  background: #010a13;
}
::-webkit-scrollbar-track:active {
  background: #010a13;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
.c-play-button{
    cursor:pointer;
    display:block;
    text-transform:uppercase;
    transition:color 1s cubic-bezier(.06,.81,0,.98);
    vertical-align:middle;
    text-decoration: none;
    background:url(https://cdn.leagueoflegends.com/riotbar/prod/1.6.169/images/account/sprites-s2a5147f733.png) 0 -293px;
    color:#b2d9db;
    height:41px;
    line-height:41px;
    position:relative;
    text-align:center;
    width:129px;
    z-index:0;
    font-family: 'Beaufort';
    font-size: 14px;
    margin-right: auto;
    margin-left: auto;
    zoom: 1.5;
}
.c-play-button:active{
    background:url(https://cdn.leagueoflegends.com/riotbar/prod/1.6.169/images/account/sprites-s2a5147f733.png) 0 -181px;
    color:#005a82
}
.c-play-button:before{
    background:url(https://cdn.leagueoflegends.com/riotbar/prod/1.6.169/images/account/sprites-s2a5147f733.png) 0 -237px;
    content:'';
    height:100%;
    left:0;
    opacity:0;
    position:absolute;
    transition:opacity 1s cubic-bezier(.06,.81,0,.98);
    top:0;
    width:100%;
    z-index:-1
}
.c-play-button:hover {
  text-decoration: none !important;
}
.c-play-button:hover:before{
    opacity:1
}

.c-loader {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -ms-flex-align: center;
  align-items: center;
  background-color: rgba(17, 17, 17, 0.7);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-pack: center;
  justify-content: center;
  z-index: 2900000;
}

.c-spinner {
  animation-duration: 12s;
  animation-iteration-count: infinite;
  animation-name: spinner;
  animation-timing-function: linear;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAADGCAMAAAC+RQ9vAAAAHlBMVEVHcEzNv4/Ovo/Nv4/Nv47Nv4/Nv4/Nv47Nv4/Ovo/5YP2YAAAACnRSTlMA/RLbXqU/gcEoouvzmAAABSNJREFUeNrtnet26ygMhbWFbrz/C8+ads6yOeBJ3QQCLd+vkAtmgyRkxwbqAmc6AM4fMK0DcFEQKK1DQm7LcDhNjakchYC1ZSjkKIgazYYgitZeybCzWKHZ4EvbAS6tjWf0B2t7MtBuuSHN4g/cHoGM1JTBSBdDJpppLBfGbYi2hQHN71DM4idy7lw+G0z5ujK26vv5rX6S6g6texqo7agObUrvw6FVoYq4QPNtPUliINNg+PTyKvJ4SFN22EVki+IA/eEIomaX0q0uzeV0InQQwf1lpDI8pXKK/jIGvZhBBImHhCdu9yN/1zgVXvVTdwJeplLPUDu4I2gEBuSiCS+NdxkwGoIWYVaflmFq75hBGLBe0dEA7hd7JUorSP3yAi9EyYtr17IoA7I04kPUa8iA9A7tdbCNlwctKSNSaB8ZGnTgHTpLizp5QMJmPUIvB3T0yb3T68mAU2+6OcaNQe5kxM8jTJXLjUFQ9hnLs8lsmRQOQiFVJP4unEodLDQMqxvypI4OjGvGUcHaKo4q1lZxVLK2iqOaRVSM1zH+4Jyc3oZ/X4U4FTBNQ05yI7cMpikR3EgYLSEZTYgCeu/kAk6zkQMQuoXPZ1gGpHz/R5MZlgPKdBs+hrAXQ8ycHTCaBHnCNkRpGpzpt8H8I1oaSWgJJMX/h4Mwmh6LB7OaJECZpoYVSPI4ysJpYhzAF8JWPsTOxWEu+YsJ7qyZOsetFEmS0pToPTth3hPbZvNBFqblkLD6ZN0zrQR7ArQSBiCEVsEUQBJuzt5IS5ydsCQAag8+nRx/2N+mgNLkKEIee47R5ORMm83m12HCtCwsduRTyY0XlGDnvEoC/xJutBDm/zVb6veUaQlYr3qeRRNAiwAkvXTpbLQIthOSzWazeQ+sLpaZloSzuEYCU8YHKdTFaCFcA3/IxJ96PghaiACA9GFL55xXXJ0WQsT2nx2bzWaz+d3gxMItx4k9AJvNZrPZLAmbCC2EqxcXFbKJa1rwAs9xgY0p4w+hTgthpwtsmfhTz7qXP01c9wWrzWazGcz6N1usf+vLT7oRaf3bwn7UTXrr3zK52Wxezn7I41nMmR4gscJDQVB79CgdfMmH5epP5yd7AqB52Yflrp+3PPIqppXIisqPLWTFfGrfqb7ZSy802rX+Ah3rL5cSRtesv3jN+ksJrb+w0/rLbP30Rc+IeU9s08JO06BC38QShCbBimlg3bVkBYj8vejsNBGWAKOb5ITDopZdS1aAlKkfY8x88Eo8ndbijsKgZjMs/vpUn+dZDp6pwGXlxflX3/Lh8+B744pTNXszlL01zV+N+O0bHlU/NxqG8Mt0CBKXZR2XPgWVOuRFXUIGyEA78qIsnWo+WGtbvkAMzspzj2pHn4Eoovcg84g92BO0h8uN3mA1A9LBMYZvdytAfrVj8PjNh0mRXly9vWMraArpdyrJgHWcLpjesE266dOSsnpZ+fhN60nhT8sAePym9QGvmvAcASmTws7Uwdah350T+Vzlg2S2d2hPsJN92R3T1LqWo596wxFXcR7ItxyiHNODCKb+8IVV20mShVMDCW+OAAOd9mC/H2Mc2jxPBOq3jxBXF8aj0PbIOLwlwxAnSUHFSL4NBnLbMBTSksHla66ytOHUHXouBKwlgwAuv1NXNZ6sQk07ogRuykjI7R+wGk1AFXmoKUOryDYPdctzOZ1cDFmHZLaLn9QypAptk2Gln2glo9YnajQvte2U1rYOCqlkHIVl4MwXLc9MPfgHhC4YftVqJ4sAAAAASUVORK5CYII=);
  background-size: cover;
  height: 75px;
  position: relative;
  width: 75px;
  z-index: 2910000;
}

@keyframes spinner {
    0% {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(1turn)
    }
}

.c-title {
  font-family: 'Beaufort';
  padding-left: 5px;
  line-height: 60px;
  font-size: 30px;
}

</style>
