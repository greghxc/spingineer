function getEngineers() {
	engineers = $("input:checkbox:checked.engineer").map(function () {
    return this.value;
  }).get();
  return _.shuffle(engineers);
}

function spinWheel(duration, max, choices, next) {
	if (duration < max) {
  	var choice = choices.shift();
    $("#result").html("<p class=\"engineer\">" + choice + "<p>");
    choices.push(choice);
    setTimeout(function(){
      spinWheel(duration * 1.3, max, choices, next)
    }, duration);
  } else {
    console.log(next);
  	next();
  }
}

function init(engineers) {
  console.log("initializing with: " + engineers);
  $("#result").append(baseForm());
  _.each(engineers, function(engineer) {
    console.log("checkbox for: " + engineer);
    $("#field-form").append(checkboxFactory(engineer));
  })
  $("#result").append('<button id="doThing" class="ui button">SPINGINEER!</button>')
}

function checkboxFactory(name) {
  return "<div class=\"field\"> \
    <div class=\"ui checkbox\"> \
      <input type=\"checkbox\" checked class=\"engineer\" value=\"" + name + "\" name=\"example\"> \
      <label>" + name + "</label> \
    </div> \
  </div>"
}

function baseForm() {
  return "<div class=\"ui form\"> \
  <div id=\"field-form\" class=\"grouped fields\"> \
    <label>Outbound Throughput</label> \
    </div> \
  </div>"
}

function spin(engineers) {
  var shuffledEngineers = getEngineers();
  console.log("spinning: " + shuffledEngineers);
  makeBackground('1.gif');
  $('#result').empty();
  spinWheel(1, 1700, shuffledEngineers, finalize);
}

function finalize() {
  makeBackground('3.gif');
  $("p.engineer").append('!!!!!!').transition('tada');
}

function makeBackground(url) {
  $("body").css('background-image', 'url(' + url + ')');
};

$(document).ready(function() {
  $("body").on("click", "#doThing", function() {
    console.log("doing the thing")
    spin(engineers);
  });

  var engineers = [
    'Mike B.',
    'Rich',
    'Greg',
    'Garrick',
    'Mike P.',
    'Paul',
    'Joseph',
    'Anton'
    ]

  init(engineers);
});
