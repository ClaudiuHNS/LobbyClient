<template>
  <div class="c-play">
    <button class="c-play-button" @click="open">
      Play
    </button>
    <div v-if="active" class="c-play-menu">
      <div class="c-steps">
        <div :class="{'c-step': true, 'c-step--active': step == 0}">
          GAME MODE
        </div>
        <div :class="{'c-step': true, 'c-step--active': step == 1}">
          SELECT MAP
        </div>
      </div>
      <div v-if="step == 0" class="c-gamemode-selection">
        <div v-for="gamemode in gamemodes" :key="gamemode.id" class="c-gamemode" @click="selectGamemode(gamemode.id)">
          <div v-bind:class="{'c-gamemode__selector': true, 'c-gamemode__selector--disabled': !gamemode.enabled, 'c-gamemode__selector--active': gamemode.id == selectedGamemode }">
            <img :src="gamemode.image" />
          </div>
          {{ gamemode.name }}
        </div>
      </div>
      <div v-if="step == 1" class="c-map-selection">
        <div v-for="map in maps" :key="map.id" class="c-map" @click="selectMap(map.id)">
          <div v-bind:class="{'c-map__selector': true, 'c-map__selector--disabled': !map.enabled, 'c-map__selector--active': map.id == selectedMap }" :style="{'background': 'url(' + map.image + ') no-repeat center', 'background-size': '200%'}">
          </div>
          {{ map.name }}
        </div>
      </div>
      <div class="c-gamemode__actions">
        <div v-if="step == 0">
          <Button text="next" @click.native="step = 1"/>
          <Button text="cancel" @click.native="active = false" />
        </div>
        <div v-if="step == 1">
          <Button text="accept" @click.native="active = false"/>
          <Button text="back" @click.native="step = 0" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';

@Component({
  components: {
    Button,
  },
})
export default class PlayMenu extends Vue {
  private selectedGamemode!: number;
  private selectedMap!: number;
  private gamemodes!: any;
  private maps!: any;
  private active!: boolean;
  private step!: number;

  public data() {
    return {
      gamemodes: [{
        id: 0,
        name: 'normal',
        image: 'https://universe.leagueoflegends.com/images/role_icon_support.png',
        enabled: true,
      },
      {
        id: 1,
        name: 'ranked',
        image: 'https://universe.leagueoflegends.com/images/role_icon_fighter.png',
        enabled: false,
      },
      {
        id: 2,
        name: 'custom',
        image: 'https://universe.leagueoflegends.com/images/role_icon_mage.png',
        enabled: true,
      }],
      maps: [
        { id: 1, name: 'Summoners\' Rift (Old)', image: 'http://i.imgur.com/b10oWHv.jpg', enabled: true },
        { id: 11, name: 'Summoners\' Rift (New)', image: 'http://i.imgur.com/b10oWHv.jpg', enabled: true },
        { id: 12, name: 'Howling Abyss', image: 'http://i.imgur.com/qvT3TI1.jpg', enabled: true },
        { id: 10, name: 'Twisted Treeline', image: 'http://i.imgur.com/MXua547.jpg', enabled: false },
        { id: 8, name: 'Crystal Scar', image: 'http://i.imgur.com/jnJTRkL.jpg', enabled: true },
      ],
      selectedGamemode: 0,
      selectedMap: 1,
      step: 0,
      active: false,
    };
  }

  public selectGamemode(gamemodeId: number) {
    if (this.gamemodes.filter((gamemode: any) => gamemode.id === gamemodeId)[0].enabled) {
      this.selectedGamemode = gamemodeId;
    }
  }

  public selectMap(mapId: number) {
    if (this.maps.filter((map: any) => map.id === mapId)[0].enabled) {
      this.selectedMap = mapId;
    }
  }

  public open() {
    this.active = true;
    this.selectedGamemode = 0;
    this.selectedMap = 1;
    this.step = 0;
  }
}
</script>

<style lang="scss">

.c-play-menu {
  position: fixed;
  top: 65px;
  left: 0;
  width: 100%;
  font-family: 'Beaufort';
  background: linear-gradient(to bottom,#010a13 0,#112120 100%);
  border-bottom: solid 1px #3E4445;

  .c-steps {
    .c-step {
      display: inline-block;
      font-size: 25px;
      margin: 10px 40px;
      padding: 10px 0;
    }
    
    .c-step--active {
      border-width: 2px;
      border-style: solid;
      border-image: linear-gradient(to left, rgba(0, 0, 0, 0) 0, #CDBE91 50%, rgba(0, 0, 0, 0) 100%) 0 0 100% 0;
    }
  }

  .c-gamemode, .c-map {
    display: inline-block;
    margin: 20px 30px;
    text-align: center;
    color: #F4DE93;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;

    .c-gamemode__selector, .c-map__selector {
      border-radius: 50%;
      width: 184px;
      height: 184px;
      border: solid 4px #14555B;
      vertical-align:top;
      position: relative;
      z-index: 1;
      margin-bottom: 20px;
      margin-right: auto;
      margin-left: auto;

      img {
        width: 78px;
        height: 78px;
        margin: 50px;
        vertical-align:middle;
      }

      &.c-gamemode__selector--active, &.c-gamemode__selector--active:hover, &.c-map__selector--active, &.c-map__selector--active:hover {
        border: solid 4px #F4DE93;
      }

      &:hover {
        border: solid 4px #564624;
      }

      &:active {
        border: solid 4px #F4DE93;
      }
    }

    .c-gamemode__selector::before {
      content: '';
      display: block;
      background: url(https://lolstatic-a.akamaihd.net/frontpage/apps/prod/multistep-signup/en_US/2af725f927413a425b4bed760127010434536ba0/assets/img/button-bg-pattern.png) repeat-x top left;
      background-size: auto 100%;
      background-position: 0 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: .5;
      animation: movingBG 500s linear infinite;
      animation-play-state: paused;
      will-change: background-position;
      transition: .4s ease;
      border-radius: 50%;
      z-index: -1;
    }

    .c-gamemode__selector--active::before, .c-gamemode__selector:hover::before {
      opacity: 1;
      animation-play-state: running;
    }

    .c-gamemode__selector--disabled, .c-map__selector--disabled {
      filter: grayscale(100%);
    }
  }

  .c-gamemode__actions {
    display: flex;
    -webkit-flex-flow: row wrap;
    justify-content: space-around;

    Button {
      margin: 5px;
    }
  }
}
</style>