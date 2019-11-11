<template>
  <div class="side-container">
    <h3 class="side-container-title1">点击排行</h3>
    <div class="row-item" v-for="(obj , index) in list" :key="obj.id">
      <p style="font-size: 14px">{{index+1}}.{{obj.title}}</p>
    </div>

    <div>
      <h3 class="side-container-title2">标签云</h3>
      <Tag color="primary">primary</Tag>
      <Tag color="success">success</Tag>
      <Tag color="error">error</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="magenta">magenta</Tag>
      <Tag color="red">red</Tag>
      <Tag color="volcano">volcano</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="gold">gold</Tag>
      <Tag color="yellow">yellow</Tag>
      <Tag color="lime">lime</Tag>
      <Tag color="green">green</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="geekblue">geekblue</Tag>
      <Tag color="purple">purple</Tag>
      <Tag color="#FFA2D3">Custom Color</Tag>
    </div>


  </div>
</template>

<script type="text/javascript">
  export default {
    data() {
      return {
        list: [
          {
            id: 1,
            title: "文章内容。。。。。。。。。。。。",
            time: '2019-01-01 15:00:00'
          },
          {
            id: 2,
            title: "文章内容。。。。。。。。。。。。",
            time: '2019-01-01 15:00:00'
          },
          {
            id: 3,
            title: "文章内容。。。。。。。。。。。。",
            time: '2019-01-01 15:00:00'
          },
          {
            id: 4,
            title: "文章内容。。。。。。。。。。。。",
            time: '2019-01-01 15:00:00'
          },
          {
            id: 5,
            title: "文章内容。。。。。。。。。。。。",
            time: '2019-01-01 15:00:00'
          }
        ]
      }
    }
  }
</script>
<style>
  .side-container-title1 {
    /*padding-bottom: 16px;*/
  }
  .side-container-title2 {
    padding-top: 32px;
  }

  .side-container {
    margin: 50px auto;
    width: 80%;
    background-color: #FFFFFF;
    padding: 16px;
  }

  .row-item {
    padding: 16px 0 0 0;
  }

  .row-item-left {
    text-align: left;
  }
</style>
