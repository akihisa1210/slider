/**
 * 以下の処理を実行する。
 * 1. テキストエリアの keyup イベントを監視する
 * 2. テキストエリアの内容を取得する
 * 3. marked にパースさせる
 * 4. パース結果を HTML として出力する
 * 5. highlight.js でコードブロックをハイライトする
 */
$(function() {
    marked.setOptions({
        langPrefix: ''
    });

    $('#editor').keyup(function() {
        var src = $(this).val();

        var html = marked(src);

        $('#result').html(html);

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
    });
});

/**
 * テキストエリアのサイズを、入力に応じて拡張する。
 */
$(function() {
    var $editor = $('#editor');
    var lineHeight = parseInt($editor.css('lineHeight'));
    $editor.on('input', function(e) {
      var lines = ($(this).val() + '\n').match(/\n/g).length;
      $(this).height(lineHeight * lines);
    });
  });
