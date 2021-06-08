(function() {
    tinymce.create("tinymce.plugins.HTMLCharCount", {
        _MaxLength: 0,
        _CharsString: "",
        _RemainString: "",
        init: function(a, b) {
            var c = this;
            c._MaxLength = a.getParam("htmlcharcount_maxchars", 0);
            if (a.getParam("theme", "") != "advanced") {
                return
            }
            c._CharsString = " " + a.getLang("htmlcharcount.chars", "HTML chars");
            c._RemainString = " " + a.getLang("htmlcharcount.remaining", "HTML chars remaining");
            a.onPostRender.add(function(e, d) {
                var f = document.getElementById(e.id + "_path_row").parentNode;
                tinymce.DOM.add(f, "div", {
                    style: "float: right",
                    id: e.id + "_charCounter"
                }, "")
            }); /* by sanjay Start - to solve spell check not working issue, event Changed*/
            a.onChange.add(c._updateCount, c); /* by snjay End - event changed */ /* by sanjay Start - method added */
            a.onInit.add(function(a) {
                a.selection.onSetContent.add(function() {
                    c._updateCount(a);
                });
                c._updateCount(a);
            });
            a.onSetContent.add(function(a) {
                c._updateCount(a);
            }); /*by sanjay End - added */ /* by sanjay End - to solve spell check not working issue, event Changed*/
            a.onKeyUp.add(c._updateCount, c)
        },
        _updateCount: function(a, b) {
            document.getElementById(a.id + "_charCounter").innerHTML = this._getPluginContent(a)
        },
        _getPluginContent: function(b) {
            var a = numEncode(fixnewlines_textarea(b.getContent())).length;
            if (this._MaxLength < 1) {
                return a + this._CharsString
            }
            if (this._MaxLength > a) {
                return (this._MaxLength - a) + this._RemainString
            }
            return "<span style='color: red'>" + (this._MaxLength - a) + this._RemainString + "</span>"
        },
        getInfo: function() {
            return {
                longname: "HTML Character Counter plugin",
                author: "Chad Killingsworth, Missouri State University",
                authorurl: "http://www.missouristate.edu/web/",
                version: "1.0"
            }
        }
    });
    tinymce.PluginManager.add("htmlcharcount", tinymce.plugins.HTMLCharCount)
})();