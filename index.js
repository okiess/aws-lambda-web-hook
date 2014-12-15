var needle = require('needle');

exports.handler = function(event, context) {
  console.log("Running aws web hook function");
  console.log("==================================");
  console.log("event", event);  
  if (event.web_hook_url != null) {
    var options = {
      timeout: event.timeout != null ? event.timeout : 60000, // 60 seconds
      follow: true
    }
    needle.post(event.web_hook_url, event.params != null ? event.params : {}, options, function(err, resp) {
      if (err != null && resp != null) {
        console.log("Finished web hook: " + event.web_hook_url);
        console.log("Response Statuscode: " + response.statusCode);
        context.done();
      } else {
        console.log("Webhook failed for " + event.web_hook_url + " failed: " + err);
        if (resp != null) {
          console.log("Response: " + resp.statusCode);
        }
        context.done();
      }
    });
  } else {
    context.done();
  }
}
