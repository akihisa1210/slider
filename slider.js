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
        langPrefix: '',
        sanitize: false,
    });

    $('#editor').keyup(function() {
        var src = $(this).val();

        // marked のレンダラを変更し、<h1> の前に </div><div class="slide"> が入力されるようにする。
        var renderer = new marked.Renderer();
        renderer.heading = function(text, level) {
            if (level === 1) {
                return `</div><div class="slide"><h${level}>${text}</h${level}>`;
            } else {
                return `<h${level}>${text}</h${level}>`;
            }
        };

        // marked のレンダラを変更し、段落内の改行が html に反映されるようにする。
        renderer.paragraph = function(text) {
            var modifiedText = text.replace(/\r\n|\r|\n/g, '<br>');
            return `<p>${modifiedText}</p>`;
        };

        // html の冒頭の </div> を削除し、末尾に </div> を挿入する。
        var html = marked(src, {renderer: renderer}).replace(/<\/div>/, '') + '</div>';

        $('#result').html(html);
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
