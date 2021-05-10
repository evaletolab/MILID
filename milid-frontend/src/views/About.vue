<template>
  <div class="about">
    <!-- TOOLBAR -->
    <nav class="toolbar">
      <div class="toolbar-row">
        <div class="toolbar-section-start">
          <button class="start icon" @click="onBack()">
            <MILIDIcons name="back" color="white"/>
          </button>
        </div>

        <div class="toolbar-title">
          <MILIDIcons name="logo" width="80" color="white"/>
        </div>        
        
        <div class="toolbar-section-end">
          <button class="icon end">
            <MILIDIcons name="parametres" color="white" @wasClicked="showParameters = true"/>
          </button>
        </div>
      </div>
    </nav>
    
    <ParametersPage :open="showParameters" v-on:closerequest="showParameters = false" />
    
    <div class="about-content">

      <h1>À propos</h1>
      <p>MILID est une application de microlearning pratique et accessible. Conçue par des étudiant·e·s pour des étudiant·e·s, elle te permet de devenir un pro de la recherche d’information. Le tout grâce à une interface graphique simple d’utilisation, accessible directement depuis ton smartphone.</p>
      <p>MILID a vu le jour dans le cadre de l’appel à projet « L’enseignement à l’ère numérique » porté par la HES-SO. La HES-SO Haute école spécialisée de Suisse occidentale a été créée en 1998 et est reconnue par la Confédération et membre de swissuniversities. Ce projet a été réalisé conjointement par la HEG et la HEAD.</p>
      <p>HEG (Haute Ecole de gestion de Genève) : La HEG de Suisse à regrouper les quatre filières d'études reliées au domaine de l'économie et des services : économie d'entreprise, informatique de gestion, information documentaire et International Business Management.</p>
      <p>HEAD (Haute Ecole d’Art et de Design) : La HEAD est née en 2006 de la fusion de deux écoles bicentenaires (l’Ecole supérieure des Beaux-Arts et de la Haute école d’Arts appliqués) et s’est imposée comme l’une des meilleures écoles d’art et de design en Europe.</p>
      <p>Les étudiantes de la HEG ont consciencieusement structuré l’information, mis une pincée de leur imagination et ont fait preuve de patience et de collaboration pour créer le contenu de l’application.</p>
      <p>Après avoir fait une semaine intense de Workshop sur le design de la formation, des étudiants de la HEAD ont été sélectionnés pour créer le graphisme de MILID. Accompagné·e·s dans ce processus par Vincent De Vevey, ils ont créés une interface esthétique et pratique.</p>
      <p>Voici les participant(e)s au projet qui ont chacune mis de leur savoir, leur enthousiasme et leur temps dans cette formation :</p>

      <p>HEG :</p>
      <p>* Amina Bouslami, fan d’animé insoupçonnée.</p>
      <p>* Eloïse Morisod, fait honneur aux plaisirs de la table à ses heures perdues.</p>
      <p>* Estelle Monnet, artiste aux talents cachés.</p>
      <p>* Julia Moï, amie de tous les animaux.</p>
      <p>* Lahra Liechti, vagabonde au gré de ses passions et rencontres.</p>
      <p>* Lydia Pieper, community manager de son chat.</p>
      <p>* Maela Panei, passionnée des mots et de leur utilisation.</p>
      <p>* Marie Boillat, pointilleuse amoureuse de la langue française.</p>
      <p>* Megan Tvenstrup, amoureuse des châteaux et autres édifices historiques.</p>

      <br>
      <p>HEAD :</p>
      <p>* Benjamin Hirschi, Sculpteur d'icônes et chasseur de couleur.</p>
      <p>* Floriane Biner, Innovatrice d'identité et mère du logo.</p>
      <p>* Matilda Pförtner, Dompteuse de lettre et navigatrice de l'espace.</p>
      <p>* Théa Heckendorn, Exploratrice de contenu et recenseuse de formes.</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>

  .about{
    background: white;
    color: #333;
    position: absolute;
    width: 100vw;
    height: auto;
    padding-top: 80px;
    .toolbar{
      transform: translateY(0);
      transition: all 200ms;      
      top:0px;
      background-color: var(--md-theme-default-primary);
      height: 69px;
      -box-shadow: 0 2px 3px -1px rgba(0,0,0,.1);
      &.exited {
        transform: translateY(69px);            
      }

      .toolbar-title{
        img.logo{
          width: 60px;
          transform: translateY(-25px);
          margin-top: 25px;
        }
      }
    }
  }  

  .about-content
  {
    margin: 20px;
    text-align: left;
  }
</style>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MILIDIcons from '../components/MILIDIcons.vue';
import ParametersPage from '../components/ParametersPage.vue';
import  cfg from '../../package.json';

@Component({
  components: {
    MILIDIcons,
    ParametersPage,
  },
})
export default class About extends Vue { 

  version = cfg.version;

  showParameters = false;
  
  onBack() {
    this.$router.go(-1);
    //this.$router.push({ path: `/module`});
  }

}
</script>
