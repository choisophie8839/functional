function _filter(list, predi) {
  let new_list= []
  _each(list, function (val) {
    if(predi(val)) new_list.push(val)
  })
  return new_list
}

function _map(list, mapper) {
  let new_list = []
  _each(list, function (val, key) {
    new_list.push(mapper(val, key))
  })
  return new_list
}

function _is_object(obj) {
  return typeof obj == 'object' && !!obj
}

function _keys(obj) {
  return _is_object(obj)? Object.keys(obj): []
}

function _each(list, iter) {
  let keys = _keys(list)
  let len = keys.length
  for (let i=0; i<len; i++ ) {
    iter(list[keys[i]], keys[i])
  }
  return list
}

function _curry(fn) {
  return function (a, b) {
    return arguments.length == 2 ? fn(a, b) : function (b) { return fn(a, b) }
  }
}

function _curryr(fn) {
  return function (a, b) {
    return arguments.length == 2 ? fn(a, b) : function (b) { return fn(b, a)}
  }
}

var _map = _curryr(_map)
var _each = _curryr(_each)
var _filter = _curryr(_filter)


var _get = _curryr(function (obj, key) {
  return obj == null ? undefined : obj[key]
})

var slice = Array.prototype.slice
function _rest(list, num) {
  return slice.call(list, num || 1)
}
function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0]
    list = _rest(list)
  }
  _each(list, function (val) {
    memo = iter(memo, val)
  })
  return memo
}

var _length = _get('length')

function _pipe() {
  let fns = arguments
  return function (arg) {
    return _reduce(fns, function (arg, fn) {
      return fn(arg)
    }, arg)
  }
}

// _go gets first argument and operates functions
// arguments are array-like object, if we use _rest function,
// we can get only function objects without first argument
function _go (arg) {
  let fns = _rest(arguments)
  return _pipe.apply(null, fns)(arg)
}
