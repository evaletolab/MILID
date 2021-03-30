
<template>
  <div class="admin">
    <h2>Admin</h2>
    <div v-if="error" class="error">
      erreur de connection au serveur, essayer de recharger la page.
    </div>
    <h1>total utilisateurs: {{totalUsers}}</h1>
    <div class="chart-container">
      <canvas ref="canvas_1"></canvas>
    </div>
    <div style="height:40px"></div>
    <div class="chart-container">
      <canvas ref="canvas_2"></canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .chart-container{
    position: relative; 
    height:auto; 
    width:100%    
  }
  .admin {
    color: black;
  }
  .error{
    background-color: red;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Chart, BarController, BarElement, PointElement, LinearScale, Title } from 'chart.js';
import { $metric } from '../services/metric-service';

@Component({
  components: { },
})
export default class Dashboard extends Vue {
  chart = {};

  error = false;

  totalUsers = 0;

  ctxMap = new Map();


  mounted() {
    this.setupCanvases();
    this.createCharts();
  }

  async createCharts(){

    // 1 get data
    const stats = await $metric.getStats();
    if(!stats){
      this.error = true;
      return;
    }
    this.totalUsers = stats.total_users;

    this.createCompletedModulesChart(this.ctxMap.get("canvas_1"), stats);
    this.createCompletedLessonsChart(this.ctxMap.get("canvas_2"), stats);
  }

  setupCanvases(){
    {
      const canvas = this.$refs.canvas_1 as HTMLCanvasElement;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * 1);
      canvas.height = Math.floor(height * 1);
      const ctx = canvas.getContext('2d');
      this.ctxMap.set("canvas_1", ctx);
    }

    {
      const canvas = this.$refs.canvas_2 as HTMLCanvasElement;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * 1);
      canvas.height = Math.floor(height * 1);
      const ctx = canvas.getContext('2d');
      this.ctxMap.set("canvas_2", ctx);
    }
  }

  createCompletedModulesChart(ctx, stats) {

    const data = [ 
      100, // total users = 100% 
      (stats.completed_module_m1 / this.totalUsers) * 100,
      (stats.completed_module_m2 / this.totalUsers) * 100,
      (stats.completed_module_m3 / this.totalUsers) * 100,
      (stats.completed_module_m4 / this.totalUsers) * 100,
    ];
    
    this.chart = new Chart(ctx, {
    type: 'bar',
    responsive: true,
    data: {
        labels: ['100% des utilisateurs', '% M1', '% M2', '% M3', '% M4'],
        datasets: [{
            label: 'modules complétés',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });    
  }


  createCompletedLessonsChart(ctx, stats) {

    const data = [ 
      stats.completed_lessons_m1, 
      stats.completed_lessons_m2 ,
      stats.completed_lessons_m3, 
      stats.completed_lessons_m4,
    ];

    this.chart = new Chart(ctx, {
    type: 'bar',
    responsive: true,
    data: {
        labels: ['M1', 'M2', 'M3', 'M4'],
        datasets: [{
            label: 'compte des leçons complétées',
            data: data,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    });    
  }
}
</script>
