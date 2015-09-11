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
        data = d || {},
        config = c || {};

    this._id = function _id() {
      return id;
    };
    
    this._addLeaf = function _addLeaf(leaf) {
      leafs.push(leaf);
    };
    
    this._removeLeaf = function _removeLeaf(leaf, property) {
      var i, left, right;
      if (property !== undefined) {
        right = leaf[property];
      }
      else {
        right = leaf.id();
      }
      
      for (i = 0; i < leafs.length; i++) {
        if (property !== undefined) {
          left = leafs[i][property];
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
    };
    
    this._findLeaf = function _findLeaf(value, property) {
      property = property || config[PROP_LABEL];
      var i;
      for (i = 0; i < leafs.length; i++) {
        if (leafs[i][property] === value) {
          return leafs[i];
        }
      }
      return -1;
    };
    
    this._getLeafs = function _getLeafs() {
      return leafs;
    };
    
    this._getConfig = function _getConfig() {
      return config;
    };

    this._sort = function _sort(property, compare) {
      property = property || config[PROP_LABEL];
      compare = compare || function (x, y) {
        if (x[property] < y[property]) {
          return -1;
        }
        if (x[property] > y[property]) {
          return 1;
        }
        return 0;
      };
      return leafs.sort(compare);
    };
    
    function Init() {
      var i;
      
      for (i in DEFAULT_CONFIG) {
        if (!(i in config)) {
          config[i] = DEFAULT_CONFIG[i];
        }
      }
      
      for (i in data) {
        if (i === config[PROP_LEAFS]) {
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
        tree[i] = data[i];
      }
    }
    
    Init();
  };

  SODDTree.prototype.id = function id() {
    return this._id();
  };
  
  SODDTree.prototype.sort = function sort(property) {
    return this._sort(property);
  };
  
  SODDTree.prototype.findLeaf = function findLeaf(byValue, byProperty) {
    return this._findLeaf(byValue, byProperty);
  };
  
  SODDTree.prototype.addLeaf = function addLeaf(leaf, config) {
    var configObject = config || this._getConfig(),
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
    var configObject = this._getConfig(), property = property || this._getConfig()[PROP_LABEL],
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
  
  SODDTree.prototype.getLeafs = function getLeafs() {
    return this._getLeafs();
  };
  
  SODDTree.prototype.getLabel = function getLabel() {
    var prop_label = this._getConfig()[PROP_LABEL];
    return this[prop_label];
  };

  SODDTree.prototype.setLabel = function setLabel(label) {
    var prop_label = this._getConfig()[PROP_LABEL];
    this[prop_label] = label;
    return this;
  };
  return SODDTree;
})();