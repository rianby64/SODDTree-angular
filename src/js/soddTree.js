var SODDTree = SODDTree || (function() {
  "use strict";

  var PROP_LABEL = "label",
      PROP_LEAFS = "leafs",
      DEFAULT_CONFIG = {
        leafs: PROP_LEAFS,
        label: PROP_LABEL
      },
      generateID = (function () {
        var id = 0;
        return function _generateID () {
          return 'SODDTree_id' + (id++);
        };
      })();
  
  function SODDTree(d, c) {
    var tree = this, leafs = [], id = generateID(),
        parent,
        node = {},
        data = d || {},
        config = c || {};

    function _id() {
      return id;
    };
    
    function _leafs() {
      return leafs;
    };
    
    function _config() {
      return config;
    };
    
    function _node() {
      return node;
    };
    
    function _parent(leaf) {
      if (leaf) {
        if (leaf instanceof SODDTree) {
          parent = leaf;
        }
        else {
          throw new Error('_parent(param) accepts only SODDTree elements as parametr');
        }
      }
      return parent;
    };
    
    function _addLeaf(leaf) {
      leaf._parent(this);
      leafs.push(leaf);
      return this;
    };
    
    function _removeLeaf(leaf, property) {
      var i, left, right;
      if (property !== undefined) {
        right = leaf.node()[property];
      }
      else {
        right = leaf.id();
      }
      
      for (i = 0; i < leafs.length; i++) {
        if (property !== undefined) {
          left = leafs[i].node()[property];
        }
        else {
          left = leafs[i].id();
        }
        if ((left !== undefined) && (right !== undefined)) {
          if (left === right) {
            leafs.splice(i, 1);
          }
        }
      }
      return this;
    };
    
    function _findLeaf(value, property) {
      property = property || _config()[PROP_LABEL];
      var i;
      for (i = 0; i < leafs.length; i++) {
        if (leafs[i].node()[property] === value) {
          return leafs[i];
        }
      }
      for (i = 0; i < leafs.length; i++) {
        var found = leafs[i].findLeaf(value, property);
        if (found !== -1) {
          return found;
        }
      }
      return -1;
    };
    
    function _swap(from, to) {
      var parent_from = from._parent(),
          parent_to = to._parent();
      
      parent_from.removeLeaf(from);
      parent_to.removeLeaf(to);
      
      parent_to.addLeaf(from);
      parent_from.addLeaf(to);
    };
    
    function _dropIntoLeaf(drop) {
      var drag = this,
          parent_drag = drag._parent();
      
      parent_drag.removeLeaf(drag);
      drop.addLeaf(drag);
    };
    
    function _sort(property, compare) {
      property = property || _config()[PROP_LABEL];
      compare = compare || function (x, y) {
        if (x.node()[property] < y.node()[property]) {
          return -1;
        }
        if (x.node()[property] > y.node()[property]) {
          return 1;
        }
        return 0;
      };
      leafs.forEach(function(item) {
        if (item.leafs().length > 0) {
          item.sort(property, compare);
        }
      });
      leafs.sort(compare);
    };
    
    function Init() {
      var i;
      
      for (i in DEFAULT_CONFIG) {
        if (!(i in config)) {
          _config()[i] = DEFAULT_CONFIG[i];
        }
      }
      
      for (i in data) {
        if (i === _config()[PROP_LEAFS]) {
          if (data[i] instanceof Array) {
            var data_leafs = data[i];
            data_leafs.forEach(function(item) {
              tree.addLeaf(item, config);
            })
            continue;
          }
          if (data[i] instanceof Object) {
            tree.addLeaf(data[i], config);
            continue;
          }
          else {
            throw new Error('Leafs must be either inside an array or an object');
          }
          continue;
        }
        node[i] = data[i];
      }
    }
    
    this._id = _id;
    this._config = _config;
    this._node = _node;
    this._leafs = _leafs;
    this._parent = _parent;
    
    this._swap = _swap;
    this._sort = _sort;
    
    this._dropIntoLeaf = _dropIntoLeaf;
    this._findLeaf = _findLeaf;
    this._removeLeaf = _removeLeaf;
    this._addLeaf = _addLeaf;
    
    Init();
  };
  
  SODDTree.prototype.id = function id() {
    return this._id();
  };
  
  SODDTree.prototype.node = function node() {
    return this._node();
  };
  
  SODDTree.prototype.sort = function sort(property) {
    return this._sort(property);
  };
  
  SODDTree.prototype.swap = function sort(from, to) {
    return this._swap(from, to);
  };
  
  SODDTree.prototype.dropIntoLeaf = function dropIntoLeaf(drop) {
    return this._dropIntoLeaf(drop);
  };
  
  SODDTree.prototype.findLeaf = function findLeaf(byValue, byProperty) {
    return this._findLeaf(byValue, byProperty);
  };
  
  SODDTree.prototype.addLeaf = function addLeaf(leaf, config) {
    var configObject = config || this._config(),
        leafObject;
    if (leaf instanceof SODDTree) {
      leafObject = leaf;
    }
    else {
      leafObject = new SODDTree(leaf, configObject);
    }
    this._addLeaf(leafObject);
    return this;
  };
  
  SODDTree.prototype.removeLeaf = function removeLeaf(leaf, property) {
    var configObject = this._config(), property = property || this._config()[PROP_LABEL],
        leafObject;
    if (leaf instanceof SODDTree) {
      leafObject = leaf;
      this._removeLeaf(leafObject)
      return this;
    }
    else if (leaf instanceof Object) {
      leafObject = new SODDTree(leaf, configObject);
    }
    else {
      var leafTmp = {};
      leafTmp[property] = leaf;
      leafObject = new SODDTree(leafTmp, configObject);
    }
    this._removeLeaf(leafObject, property);
    return this;
  };
  
  SODDTree.prototype.leafs = function leafs() {
    return this._leafs();
  };
  
  SODDTree.prototype.getLabel = function getLabel() {
    var prop_label = this._config()[PROP_LABEL];
    return this._node()[prop_label];
  };

  SODDTree.prototype.setLabel = function setLabel(label) {
    var prop_label = this._config()[PROP_LABEL];
    this._node()[prop_label] = label;
    return this;
  };
  
  SODDTree.prototype.toObject = function toString() {
    var leafs = this._leafs(),
        node = this._node(),
        prop_leaf = this._config()[PROP_LEAFS];
    node[prop_leaf] = [];
    leafs.forEach(function(item) {
      node[prop_leaf].push(item.toObject());
    }, this);
    return node;
  };
  
  return SODDTree;
})();