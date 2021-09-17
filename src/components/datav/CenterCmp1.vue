<template>
<!-- <baidu-map id="map">
  </baidu-map> -->
   <div id="map_box">
     
   </div>
</template>

<script>
import BaiduMap from 'vue-baidu-map'
import LabelTag from './LabelTag'
export default {
   name: 'CenterCmp',
  components: {
    LabelTag,
    BaiduMap
  },
  data() {
    return {
      name: 1212,
      map: null,
      infoBox: null,
    };
  },
  mounted() {
    this.showMap();
    //动态添加的dom 调用vue事件
    let _this = this;
    window.imageClick = function () {
      _this.vueImageClick();
    };
  },
  methods: {
    /**
     * 地图展示
     */
    showMap() {
      this.map = new BMap.Map("map_box"); //对应地图容器id
      let centerPoint = new BMap.Point(113.302114, 22.452695);
      this.map.centerAndZoom(centerPoint, 15);
      this.map.enableScrollWheelZoom(true);
      this.map.enableDoubleClickZoom(true);
      /*
			//地图样式
			this.map.setMapStyle({
			  styleJson: []
			})*/
      this.markerPoint();
    },
    /**
     * 添加地图marker
     */
    markerPoint() {
      let _this = this;
      this.map.clearOverlays();
      let iconImage = new BMap.Icon(
        require("../../assets/img/2.png"),
        new BMap.Size(48, 48)
      );
      let point = new BMap.Point(113.302114, 22.452695);
      let marker = new BMap.Marker(point, { icon: iconImage }); // 创建标注
      marker.addEventListener("click", () => {
        //关闭其他标记点的弹框
        if (_this.infoBox != null) {
          _this.infoBox.close();
        }
        _this.markerPointClick(113.302114, 22.452695);
      });
      _this.map.addOverlay(marker);


       let point1 = new BMap.Point(113.311114, 22.461695);
      let marker1 = new BMap.Marker(point1, { icon: iconImage }); // 创建标注
      marker1.addEventListener("click", () => {
        //关闭其他标记点的弹框
        if (_this.infoBox != null) {
          _this.infoBox.close();
        }
        _this.markerPointClick(113.311114, 22.461695);
      });
      _this.map.addOverlay(marker1);



       let point2 = new BMap.Point(113.321114, 22.471695);
      let marker2 = new BMap.Marker(point2, { icon: iconImage }); // 创建标注
      marker2.addEventListener("click", () => {
        //关闭其他标记点的弹框
        if (_this.infoBox != null) {
          _this.infoBox.close();
        }
        _this.markerPointClick(113.321114, 22.471695);
      });
      _this.map.addOverlay(marker2);
    },
    /**
     * 点击marker弹出信息框
     */
    markerPointClick(lat, lng) {
      let _this = this;
      let html =
        '<div class= "infoBoxContent">' +
        "<div>" +
        "<p>用户名：" +
        this.name +
        "</p>" +
        "<p>手机号：" +
        this.name +
        "</p>" +
        "<p>所在位置：" +
        this.name +
        "</p>" +
        "<p>坐标：" +
        this.name +
        "</p>" +
        "<p>设备id：" +
        this.name +
        "</p>" +
        "</div>" +
        '<img src="https://image.baidu.com/search/down?tn=download&ipn=dwnl&word=download&ie=utf8&fr=result&url=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fbpic.588ku.com%252Felement_origin_min_pic%252F17%252F11%252F24%252Fe257c3e88276fe513400a7007463dd55.jpg%2521r650%26refer%3Dhttp%253A%252F%252Fbpic.588ku.com%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Djpeg%3Fsec%3D1633575893%26t%3D299260ffcc4f8b7c1edb631ded8d36c9&thumburl=https%3A%2F%2Fimg0.baidu.com%2Fit%2Fu%3D2981740092%2C3532705960%26fm%3D26%26fmt%3Dauto%26gp%3D0.jpg style="width: 100%;height: 100%;">' +
        "</div>";

      let opts = {
        boxStyle: {
          width: "435px",
          height: "233px",

          // margin: '30px 0',
        },
        title: "安全帽信息",
        closeIconMargin: "20px 5px 0 0",
        closeIconUrl: require("../../assets/img/1.png"),
        enableAutoPan: true,
        align: INFOBOX_AT_TOP,
      };

      this.infoBox = new BMapLib.InfoBox(this.map, html, opts);
      /*this.infoBox._getCloseIcon = function() {
			return ''
			}*/
      let point = new BMap.Point(lat, lng);
      let marker = new BMap.Marker(point);
      this.infoBox.open(marker);
    },
    vueImageClick() {
      console.log("弹框中按钮的点击事件");
    },


   
  },
};
</script>
<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;

  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }

  .cc-details {
    height: 120px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;

    .card {
      background-color: rgba(4,49,128,.6);
      color: #08e5ff;
      height: 70px;
      width: 70px;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 10px;
    }
  }

  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;

    .ccmc-middle {
      width: 50%;
      height: 90%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }

    .ccmc-left, .ccmc-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;

      span {
        font-size: 40px;
        font-weight: bold;
      }

      .station-info {
        height: 80px;
        display: flex;
        align-items: center;
      }
    }

    .ccmc-left {
      align-items: flex-end;

      span {
        margin-left: 20px;
      }
    }

    .ccmc-right {
      align-items: flex-start;

      span {
        margin-right: 20px;
      }
    }
  }

  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  #map_box {
  width: 100%;
  height: 100%;
}
}
</style>
