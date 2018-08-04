<template>
    <div class="c-icon-selector-input">
        <md-dialog :md-active.sync="showDialog" class="c-icon-selector">
            <md-dialog-title>Choose your summoner icon</md-dialog-title>
            <div class="c-icons-list">
                <div v-for="icon in icons" :key="icon.id" class="c-icon">
                    <img :src="'http://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/' + icon + '.png'" :class="(selectedIcon == icon)?'active':''"
                    @click="selectedIcon = icon" />
                </div>
            </div>
            <div class="c-validate">
                <Button text="Save" @click.native="showDialog = false; if(onChange) onChange(selectedIcon)" />
            </div>
        </md-dialog>
        <div @click="showDialog = true" class="c-icon-selector-input__icon" v-if="icons">
            <img :src="'http://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/' + icons[selectedIcon] + '.png'"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import { SUMMONER_ICONS } from '../assets/staticData';

@Component({
  components: {
    Button,
  },
})
export default class IconSelector extends Vue {
  @Prop() private onChange!: (selectedIcon: number) => void;
  private selectedIcon!: number;
  private icons: any = [];

  public data() {
      return {
          icons: SUMMONER_ICONS,
          showDialog: false,
          selectedIcon: this.$store.state.selectedIcon,
      };
  }
}
</script>

<style scoped lang="scss">
.c-icon {
    display: inline-block;
    width: 64px;
    height: 66px;
    margin: 7.5px;
    border: 1px solid #3E3501;
    cursor: pointer;

    img {
        width: 64px;
        height: 64px;
        display: inline-block;
    }

    .active {
        border: 2px solid #ecc572;
    }
}

.c-icons-list {
    overflow-y: scroll;
    padding: 15px;
    border-top: 2px solid #1D2126;
}

.c-icon-selector {
    color: #F0E6D2;
    font-family: 'Beaufort';
    text-transform: uppercase;
    max-width: 768px;
    background-color: #010A13;
    border: 2px solid #1D2126;
}

.c-icon-selector-input {
    margin:0;
    display: inline-block;
    cursor: pointer;
    
    .c-icon-selector-input__icon {
        border: 3px solid #8b7544;
        img {
            width: 76px;
            height: 76px;
            display: inline-block;
        }
    }
}

.c-validate {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30px 0;
}
</style>