
<template>
  <div class="admin">
    <h2>Admin</h2>
    <div class="chart-container">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .chart-container{
    position: relative; 
    height:400px; 
    width:100%    
  }
  .admin {
    color: black;
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Chart, BarController, BarElement, PointElement, LinearScale, Title } from 'chart.js';

@Component({
  components: { },
})
export default class Dashboard extends Vue {
  chart = {};

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.floor(width * 1);
    canvas.height = Math.floor(height * 1);
    const ctx = canvas.getContext('2d');
    this.createChart(ctx);
  }

  createChart(ctx) {

    //
    // register
    // Chart.register(BarController, BarElement, PointElement, LinearScale, Title);    

    //
    // instance
    this.chart = new Chart(ctx, {
    type: 'bar',
    responsive: true,
    data: {
        labels: ['utilisateurs', 'ouverture', 'actitités', 'terminés'],
        datasets: [{
            label: '# actions',
            data: [34, 19, 7, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
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
