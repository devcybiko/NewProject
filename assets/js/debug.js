var myDebug = false;
var myIndentOffset = 0;

function myLog(data) {
    if (myDebug) {
        if (typeof data === "string") {
            console.log(myDebugText(1, ".", "", false) + " " + data);
        } else {
            console.log(myDebugText(1, ".", "", false) + " ...");
            console.log(data);
        }
    }
}
function myStack(n) {
    var error = new Error();
    var stack = error.stack.split('\n');
    return stack.slice(n + 2);
}

function myFormatCaller(line) {
    var longName = line.trim().split(" ")[1];
    var name = longName.split(".").pop();
    return { longName: longName, name: name }
}
function myCallers(n) {
    n = n < 0 ? -n : n;
    var stack = myStack(n + 1);
    var callers = [];
    var prev = "";
    var breadcrumbs = "";
    for (var i in stack) {
        var line = stack[i];
        var caller = myFormatCaller(line);
        callers.push(caller);
        breadcrumbs = breadcrumbs + prev + caller.longName;
        prev = "<-";
    }
    return { stack: stack, breadcrumbs: breadcrumbs, callers: callers, depth: stack.length };
}

function myCaller(n) {
    n = n < 0 ? -n : n;
    var stack = myStack(n + 1);
    var caller = myFormatCaller(stack[0]);
    caller.stack = stack;
    caller.depth = stack.length;
    return caller;
}

function myDebugText(n, indent = ">", msg = "entering: ", long = false) {
    var stack = myCallers(n + 1);
    var result = "";
    if (long) {
        result = indent.repeat(stack.depth + myIndentOffset) + msg + stack.callers[0].name + " breadcrumbs: " + stack.breadcrumbs;
    } else {
        result = indent.repeat(stack.depth + myIndentOffset) + stack.callers[0].name;
    }
    return result;
}

function myEnter(data = undefined) {
    if (!myDebug) return;
    console.log(myDebugText(1, indent = ">", msg = "", long = true));
    if (data) {
        console.log(data);
    }
}


function myExit(data = undefined) {
    if (!myDebug) return;
    console.log(myDebugText(1, indent = "<", msg = "", long = true));
    if (data) {
        console.log(data);
    }
}