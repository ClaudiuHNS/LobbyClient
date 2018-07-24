<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Preferences</md-dialog-title>
            <div class="c-icons-list">
                <div v-for="icon in icons" :key="icon.id" class="c-icon">
                    <img :src="'http://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/' + icon.image.full" />
                </div>
            </div>
            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="showDialog = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class IconSelector extends Vue {
  private selectedIcon: user.Icon = { id: 0, iconURL: '' };
  private icons: any = [];

  public mounted() {
      fetch('http://ddragon.leagueoflegends.com/cdn/8.14.1/data/en_US/profileicon.json')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            this.icons = myJson.data;
        });
  }

  public data() {
      return {
          icons: this.icons,
          showDialog: false,
      };
  }
}
</script>

<style scoped lang="scss">
.c-icon {
    display: inline-block;
    width: 64px;
    height: 64px;
    margin: 5px;
    border: 2px solid #645127;
    border-top-color: #c0ab71;
    border-image: linear-gradient(to bottom,#c0ab71,#645127) 1 stretch;

    img {
        width: 64px;
        height: 64px;
        display: inline-block;
    }
}
md-dialog {
    max-width: 768px;
  }
</style>