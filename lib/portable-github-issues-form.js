window.GithubIssueForm = function (options) {
    this.token = options.token;
    this.repository = options.repository;
    this.useragent = options.useragent || 'portable-github-issues-form';
    this.assignee = options.assignee || null; //GitHub usernames of assigned users.
    this.labels = options.labels || ['bug'];
    this.milestone = options.milestone || null; // Number
    this.DOMElement = null;
    this.html_url = null;
    var issue = this;
    if (!issue.token) {
        throw new Error('Error : Missing authentification token.');
    }
    if (!issue.repository) {
        throw new Error('Missing repository.');
    }
    function send(title, content) {
        // Basic validation:
        if (!title || !content) {
            var feedback = 'Error: please answer all questions before submitting your issue.';
            alert(feedback);
            throw new Error(feedback);
        }
        var endPoint = 'https://api.github.com/repos/' + issue.repository + '/issues';
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            // Process our return data
            if (xhr.status >= 200 && xhr.status < 300) {
                // Successful request
                var response = JSON.parse(xhr.response);
                console.info(response.html_url, 'redirect url 2');
                issue.html_url = response.html_url;
                issue.DOMElement.reset();
                var ask = window.confirm("Issue sent. Thank you! Would you like to view it ?");
                if (ask) {
                    window.location.href = response.html_url;
                }
            } else {
                console.error('The request failed!');
            }
        };
        // Create and send the POST request
        xhr.open('POST', endPoint, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "token " + issue.token);

        var data = {
            'title': title,
            'body': content,
            'useragent': issue.useragent,
            'labels': issue.labels
        }
        if ('' !== issue.assignee) {
            data.assignee = issue.assignee;
        }
        if ('' !== issue.milestone) {
            data.milestone = issue.milestone;
        }
        console.info(data, 'data sent:');
        xhr.send(JSON.stringify(data));
    };

    this.form = ['<div id="js-github-issues-form" class="portable-github-form">',
        '<input id="open-item" name="js-githubform-trigger" type="radio" />',
        '<input id="close-item" name="js-githubform-trigger" type="radio" checked="checked" />',
        '    <label for="open-item" class="open">Found a bug ?</label>',
        '<section>',
        '<label for="close-item" class="close">&times;</label>',
        '<span class="title">Report a bug</span>',
        '<div class="wrap">',
        '<p class="info">Think you have found a <b>bug</b>, <b>spelling mistake</b> or <b>issue</b>? Pleas tell me all about it. Thank you for your time! (<a href="//github.com/' + this.repository + '/issues" target="_blank">See current reports</a>)</p>',
        '<form id="js-github-form">',
        '<fieldset>',
        '<div><label for="git-title">Describe your issue in a few words (max. 40 characters)</label><input class="input" type="text" id="git-title" name="title" maxlength="40"></div>',
        '<div><label for="git-content">Tell me more about it</label><textarea id="git-content" name="content" class="textarea has-fixed-size" placeholder="Please describe steps to reproduce the issue, or the error message and where to find..."></textarea>',
        '</div><div><input tabindex="2" type="submit" name="send" id="js-github-issues-form-send" class="github-issues-form-send button is-dark" value="Report issue"></div>',
        ' </fieldset></form>',
        '</div></section></div>'].join('\n');
    this.addStyle = function () {
        // see scss file for a human-friendly version of the css code.
        // var css = document.createElement("style");
        // css.type = "text/css";
        // css.innerHTML = '.portable-github-form{position:fixed;bottom:-33px;right:0;z-index:9999;width:320px;height:auto;max-width:80%;padding:1.5rem;margin:2rem;font-family:sans-serif;font-size:1rem}.portable-github-form input[type=radio]{display:none}.portable-github-form label.close,.portable-github-form label.open{text-align:center;position:absolute}.portable-github-form label.open{font-size:11px;color:#222;background:#fff;width:100px;bottom:-50px;left:0;right:0;top:auto;margin:0 auto;padding:10px 0;text-transform:uppercase;z-index:1;font-weight:600;box-shadow:2px 4px 56px -6px rgba(0,0,0,.80)}.portable-github-form input#close-item:checked~label.open{-webkit-transition:bottom .3s ease .4s,background .1s ease,color .1s ease;-moz-transition:bottom .3s ease .4s,background .1s ease,color .1s ease;-ms-transition:bottom .3s ease .4s,background .1s ease,color .1s ease;-o-transition:bottom .3s ease .4s,background .1s ease,color .1s ease;transition:bottom .3s ease .4s,background .1s ease,color .1s ease;bottom:0}.portable-github-form label.open:focus,.portable-github-form label.open:hover{background:#222;color:#fff}.portable-github-form label.close{right:0;left:auto;top:0;bottom:auto;font-size:20px;background:#333;color:#fff;width:22px}.portable-github-form label.close:focus,.portable-github-form label.close:hover{background:#757786}.portable-github-form .wrap{padding:1rem}.portable-github-form section{margin:0;overflow:hidden;width:100%;height:auto;right:0;bottom:0;position:absolute;z-index:10;background:#fff;box-shadow:2px 4px 56px -6px rgba(0,0,0,.27);-webkit-backface-visibility:hidden;transition:all .4s cubic-bezier(.2,.6,.3,1)}.portable-github-form span.title{font-size:24px;padding:30px;color:#fff;background:#333;text-transform:uppercase;display:block;width:100%;font-weight:100}.portable-github-form p.info{font-size:13px;color:#999;line-height:18px}.portable-github-form input#close-item:checked~section,.portable-github-form section{transform:translateY(100%)}.portable-github-form input#open-item:checked~section{transform:translateY(0)}.portable-github-form fieldset{border:1px solid #DDD;padding:2rem}.portable-github-form legend{background:#fff;padding-right:1rem;display:block;margin-left:0}.portable-github-form div{margin:0 auto 1rem}.portable-github-form label{cursor:pointer;font-weight:700}.portable-github-form input,.portable-github-form label,.portable-github-form textarea{display:block;width:100%;font-size:.8rem;padding:5px}.portable-github-form textarea{min-height:6rem}.portable-github-form input.github-issues-form-send{font-size:1.5rem;width:auto;margin:auto}';
        // document.head.appendChild(css);
    }

    this.inject = function () {
        window.onload = function () {
            /** 
             * - Inject the HTML form into the document
             * - autohide it
             * - Bind the Events 
             * */

            document.querySelector('body').insertAdjacentHTML("beforeend", issue.form);
            // issue.addStyle();
            //var wrapper = document.getElementById('js-github-issues-form');
            issue.DOMElement = document.getElementById('js-github-form');
            // bind Submit event
            issue.DOMElement.addEventListener("submit", function (e) {
                e.preventDefault();
                var title = document.getElementById('git-title').value;
                var body = document.getElementById('git-content').value;
                send(title, body);
            });
        };
    }
};