(function(win,doc){
		function rfFontSize(){
		   var oRoot = document.getElementsByTagName('html')[0];
           //console.log(oRoot);
           var iWidth = doc.body.clientWidth || doc.document.clientWidth;
           //console.log(iWidth);
           var oFontSize = iWidth / 10;
           oRoot.style.fontsize = oFontSize + 'px';
		}    
        win.addEventListener('resize',rfFontSize,false);
        //win.addEventListener('load',rfFontSize,false);
        doc.addEventListener('DOMContentLoaded',rfFontSize,false);
	})(window,document);