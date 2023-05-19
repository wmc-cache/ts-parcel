<!-- WPS加载项配置信息，在线和离线只有一个生效，不可同时存在 -->
<!-- WPS加载项：在线模式配置	Start -->

<!-- https://kdocs.cn/l/cBk8tsBIf [金山文档] jsplugins.xml配置文档.docx -->
<!--本地-->
<!-- http://172.167.11.60:5656/jdxt/ -->
<jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://192.168.41.120:8081/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://192.168.41.120:8081/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://192.168.41.120:8081/static/wps/plugin/wpp"/>
</jsplugins>
<!--测试-->
<!-- http://172.167.11.60:5656/jdxt/ -->
<!-- <jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://192.168.0.123:5656/jdxt/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://192.168.0.123:5656/jdxt/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://192.168.0.123:5656/jdxt/static/wps/plugin/wpp"/>
</jsplugins> -->
<!--线上-->
<!-- <jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://156.20.200.236:8088/jdxt/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://156.20.200.236:8088/jdxt/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://156.20.200.236:8088/jdxt/static/wps/plugin/wpp"/>
</jsplugins> -->
<!--大电脑-->
<!-- <jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://127.0.0.1:8088/jdxt/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://127.0.0.1:8088/jdxt/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://127.0.0.1:8088/jdxt/static/wps/plugin/wpp"/>
</jsplugins> -->
<!-- WPS加载项：在线模式配置	End -->

<!-- WPS加载项：离线模式配置	Start -->
<!-- <jsplugins>
	<jsplugin name="EtOAAssist" type="et" url="http://127.0.0.1:3888/plugins/v0.1/EtOAAssist.7z" version="0.1" />
	<jsplugin name="WpsOAAssist" type="wps" url="http://127.0.0.1:3888/plugins/v0.1/WpsOAAssist.7z" version="0.1" />
	<jsplugin name="WppOAAssist" type="wpp" url="http://127.0.0.1:3888/plugins/v0.1/WppOAAssist.7z" version="0.1" />
</jsplugins> -->
<!-- WPS加载项：离线模式配置	End -->

























































import { fromDatas, fromDatas1, fromDatas2 } from '@/api/home.js'
export default function handerWord(name, cssJs) {
  let html = document.getElementsByClassName(name)[0].innerHTML // 获取要导出部分的内容
  let htmlDom = `<!DOCTYPE html>
        <html xmlns:v='urn:schemas-microsoft-com:vml'xmlns:o='urn:schemas-microsoft-com:office:office'xmlns:w='urn:schemas-microsoft-com:office:word'xmlns:m='http://schemas.microsoft.com/office/2004/12/omml'xmlns='http://www.w3.org/TR/REC-html40'  xmlns='http://www.w3.org/1999/xhtml' >
        <head>
        <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val="Cambria Math"/><m:brkBin m:val="before"/><m:brkBinSub m:val="--"/><m:smallFrac m:val="off"/><m:dispDef/><m:lMargin m:val="0"/> <m:rMargin m:val="0"/><m:defJc m:val="centerGroup"/><m:wrapIndent m:val="1440"/><m:intLim m:val="subSup"/><m:naryLim m:val="undOvr"/></m:mathPr></w:WordDocument></xml><![endif]-->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>标题</title>
            <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
            <style lang="scss">
                ${cssJs}
            </style>
        </head>
        <body>
            <div class="official">
            ${html}
            </div>
        </body>
        </html>`

  console.log('获取打印dom',htmlDom)
  let htmlDom_ = new Blob([htmlDom], { type: 'text/html;charset=utf-8' })
  let formdata = new FormData()
  formdata.append('file', htmlDom_, `sdf.html`) // sdf.html是设置文件名
  // fromDatas(formdata).then(res => {
  //     // console.log(res.data)
  // })
  // fromDatas1({ content: htmlDom }).then(res => {
  //     // console.log(res.data)
  // })
  let url = window.location.host
  fromDatas2({ content: htmlDom }).then(res => {
    if (res) {
      console.log(`http://${url}/jdxt/upload/${res.filename}`, '这是附件下载地址')
      _WpsInvoke(
        [
          {
            OpenDoc: {
              uploadPath: ``, // 修改接口
              fileName: `http://${url}/jdxt/upload/${res.filename}`, // 下载接口
              //   fileName: `http://172.167.11.60:5656/jdxt/download/exportWordByFile?filename=${res.filename}`, // 下载接口
              uploadFieldName: 'file',
              picPath: '',
              userName: '深圳卓讯'
            }
          }
        ],
        true,
        // "https://www.56xd.com/demosystemplus/public/wps/jsplugins.xml" // -- 测试
        'http://192.168.41.120:8081/static/wps/jsplugins.xml' // ---本地
        // `http://${url}/jdxt/static/wps/jsplugins.xml` // ---后台
      )
      // 打印并拉起weboffice控件
      // window.location.href =
      // "WebOffice://|Officectrl|http://192.168.21.180:5656/jdxt/edit.html"; //本地地址
      //   `WebOffice://|Officectrl|http://${url}/jdxt/edit.html`; //打包地址
      // "WebOffice://|Officectrl|http://192.168.0.205:8059/jdxt/edit.html"; //205地址
      // "WebOffice://|Officectrl|http://192.168.1.3:8088/jdxt/edit.html"; //坪山地址
    }
    // console.log(res.data)
  })

  // axios({
  //     method: "post",
  //     url: "http://192.168.3.3:8088/jdxt/download/note",
  //     data: htmlDom_,
  //     responseType: "blob" //这里如果不设置，下载会打不开文件
  // }).then(res => {
  //     console.log("download res", res);
  //     //通过后台返回 的word文件流设置文件名并下载
  //     var blob = new Blob([res.data], {
  //         type:
  //             "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8"
  //     }); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
  //     var downloadElement = document.createElement("a");
  //     var href = window.URL.createObjectURL(blob); //创建下载的链接
  //     downloadElement.href = href;
  //     downloadElement.download = "s.doc"; //下载后文件名
  //     document.body.appendChild(downloadElement);
  //     downloadElement.click(); //点击下载
  //     document.body.removeChild(downloadElement); //下载完成移除元素
  //     window.URL.revokeObjectURL(href); //释放掉blob对象
  // });
}




























<!-- WPS加载项配置信息，在线和离线只有一个生效，不可同时存在 -->
<!-- WPS加载项：在线模式配置	Start -->

<!-- https://kdocs.cn/l/cBk8tsBIf [金山文档] jsplugins.xml配置文档.docx -->
<!--本地-->
<!-- http://172.167.11.60:5656/jdxt/ -->
<!-- <jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://192.168.41.116:8080/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://192.168.41.116:8080/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://192.168.41.116:8080/static/wps/plugin/wpp"/>
</jsplugins> -->
<!--测试-->
<!-- http://172.167.11.60:5656/jdxt/ -->
<!-- <jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://192.168.0.123:5656/jdxt/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://192.168.0.123:5656/jdxt/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://192.168.0.123:5656/jdxt/static/wps/plugin/wpp"/>
</jsplugins> -->
<!--线上-->
<jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://156.20.200.236:8088/jdxt/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://156.20.200.236:8088/jdxt/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://156.20.200.236:8088/jdxt/static/wps/plugin/wpp"/>
</jsplugins>
<!--大电脑-->
<!-- <jsplugins>
	<jspluginonline name="EtOAAssist" type="et" url="http://127.0.0.1:8088/jdxt/static/wps/plugin/et"/>
	<jspluginonline name="WpsOAAssist" type="wps" url="http://127.0.0.1:8088/jdxt/static/wps/plugin/wps"/>
	<jspluginonline name="WppOAAssist" type="wpp" url="http://127.0.0.1:8088/jdxt/static/wps/plugin/wpp"/>
</jsplugins> -->
<!-- WPS加载项：在线模式配置	End -->

<!-- WPS加载项：离线模式配置	Start -->
<!-- <jsplugins>
	<jsplugin name="EtOAAssist" type="et" url="http://127.0.0.1:3888/plugins/v0.1/EtOAAssist.7z" version="0.1" />
	<jsplugin name="WpsOAAssist" type="wps" url="http://127.0.0.1:3888/plugins/v0.1/WpsOAAssist.7z" version="0.1" />
	<jsplugin name="WppOAAssist" type="wpp" url="http://127.0.0.1:3888/plugins/v0.1/WppOAAssist.7z" version="0.1" />
</jsplugins> -->
<!-- WPS加载项：离线模式配置	End -->








import { fromDatas, fromDatas1, fromDatas2 } from '@/api/home.js'
export default function handerWord(name, cssJs) {
  let html = document.getElementsByClassName(name)[0].innerHTML // 获取要导出部分的内容
  let htmlDom = `<!DOCTYPE html>
        <html xmlns:v='urn:schemas-microsoft-com:vml'xmlns:o='urn:schemas-microsoft-com:office:office'xmlns:w='urn:schemas-microsoft-com:office:word'xmlns:m='http://schemas.microsoft.com/office/2004/12/omml'xmlns='http://www.w3.org/TR/REC-html40'  xmlns='http://www.w3.org/1999/xhtml' >
        <head>
        <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val="Cambria Math"/><m:brkBin m:val="before"/><m:brkBinSub m:val="--"/><m:smallFrac m:val="off"/><m:dispDef/><m:lMargin m:val="0"/> <m:rMargin m:val="0"/><m:defJc m:val="centerGroup"/><m:wrapIndent m:val="1440"/><m:intLim m:val="subSup"/><m:naryLim m:val="undOvr"/></m:mathPr></w:WordDocument></xml><![endif]-->
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1.0">
            <title>标题</title>
            <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
            <style lang="scss">
                ${cssJs}
            </style>
        </head>
        <body>
            <div class="official">
            ${html}
            </div>
        </body>
        </html>`

  console.log('获取打印dom',htmlDom)
  let htmlDom_ = new Blob([htmlDom], { type: 'text/html;charset=utf-8' })
  let formdata = new FormData()
  formdata.append('file', htmlDom_, `sdf.html`) // sdf.html是设置文件名
  // fromDatas(formdata).then(res => {
  //     // console.log(res.data)
  // })
  // fromDatas1({ content: htmlDom }).then(res => {
  //     // console.log(res.data)
  // })
  let url = window.location.host
  fromDatas2({ content: htmlDom }).then(res => {
    if (res) {
      console.log(`http://${url}/jdxt/upload/${res.filename}`, '这是附件下载地址')
      _WpsInvoke(
        [
          {
            OpenDoc: {
              uploadPath: ``, // 修改接口
              fileName: `http://${url}/jdxt/upload/${res.filename}`, // 下载接口
              //   fileName: `http://172.167.11.60:5656/jdxt/download/exportWordByFile?filename=${res.filename}`, // 下载接口
              uploadFieldName: 'file',
              picPath: '',
              userName: '深圳卓讯'
            }
          }
        ],
        true,
        // "https://www.56xd.com/demosystemplus/public/wps/jsplugins.xml" // -- 测试
        // 'http://192.168.41.116:8080/static/wps/jsplugins.xml' // ---本地
        `http://${url}/jdxt/static/wps/jsplugins.xml` // ---后台
      )
      // 打印并拉起weboffice控件
      // window.location.href =
      // "WebOffice://|Officectrl|http://192.168.21.180:5656/jdxt/edit.html"; //本地地址
      //   `WebOffice://|Officectrl|http://${url}/jdxt/edit.html`; //打包地址
      // "WebOffice://|Officectrl|http://192.168.0.205:8059/jdxt/edit.html"; //205地址
      // "WebOffice://|Officectrl|http://192.168.1.3:8088/jdxt/edit.html"; //坪山地址
    }
    // console.log(res.data)
  })

  // axios({
  //     method: "post",
  //     url: "http://192.168.3.3:8088/jdxt/download/note",
  //     data: htmlDom_,
  //     responseType: "blob" //这里如果不设置，下载会打不开文件
  // }).then(res => {
  //     console.log("download res", res);
  //     //通过后台返回 的word文件流设置文件名并下载
  //     var blob = new Blob([res.data], {
  //         type:
  //             "application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8"
  //     }); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
  //     var downloadElement = document.createElement("a");
  //     var href = window.URL.createObjectURL(blob); //创建下载的链接
  //     downloadElement.href = href;
  //     downloadElement.download = "s.doc"; //下载后文件名
  //     document.body.appendChild(downloadElement);
  //     downloadElement.click(); //点击下载
  //     document.body.removeChild(downloadElement); //下载完成移除元素
  //     window.URL.revokeObjectURL(href); //释放掉blob对象
  // });
}
