(function(){
	'use strict';
	featureSteps(/SODDTree/)
    .given(/a (.*) = (.*) for tree/, function(property, param) {
      var obj;
      if (param === 'undefined') { obj = undefined; }
      else { obj = JSON.parse(param); }
      this[property] = obj;
    })
    .when(/calling the constructor/, function() {
      this.tree = new SODDTree(this.data, this.config);
    })
    .when(/adding a leaf (.*)/, function(param) {
      var obj = JSON.parse(param);
      this.tree.addLeaf(obj);
    })
    .when(/removing a leaf (.*) by (.*)/, function(param, property) {
      var obj
      obj = JSON.parse(param);
      this.tree.removeLeaf(obj, property);
    })
    .when(/search a leaf by (.*) with value (.*)/, function(param, value) {
      var value = JSON.parse(value);
      this.found = this.tree.findLeaf(value, param);
      expect(this.found instanceof SODDTree).toBe(true);
    })
    .when(/removing the found leaf/, function() {
      this.tree.removeLeaf(this.found);
    })
    .when(/sorting by (.*)/, function(property) {
      var leafs = this.tree.getLeafs();
      this.sorted = [];
      leafs.forEach(function(item) {
        this.sorted.push(item[property]);
      }, this);
      this.tree.sort(property);
      this.sorted.sort();
    })
    .then(/leafs are shorted by (.*)/, function(property) {
      var leafs = this.tree.getLeafs(),
          i;
      for (i = 0; i < leafs.length; i++) {
        expect(leafs[i][property]).toBe(this.sorted[i]);
      }
    })
    .then(/the tree has some id/, function() {
      var id = this.tree.id();
      expect(typeof(id)).toBe(typeof(''));
      expect(id.length > 0).toBe(true);
    })
    .then(/(.*) is a SODDTree object/, function(param){
      var expected = this[param] instanceof SODDTree;
      expect(expected).toBe(true);
    })
    .then(/the tree's Leafs is (.*)/, function(prop, param) {
      var obj = JSON.parse(param), expected;
      var expected = this.tree.getLeafs() instanceof Array;
      expect(expected).toBe(true);
    })
    .then(/tree's leafs is an Array where every item is SODDTree/, function(text) {
      var leafs = this.tree.getLeafs();
      expect(leafs instanceof Array).toBe(true);
      
      leafs.forEach(function(leaf) {
        expect(leaf instanceof SODDTree).toBe(true);
      })
    })
    .then(/tree's label is (.*)/, function(text) {
      var expected = this.tree.getLabel();
      expect(expected).toBe(text);
    })
    .then(/tree's property (.*) is (.*)/, function(property, value) {
      var expected = this.tree[property];
      expect(expected).toBe(value);
    })
    .then(/every tree's label's leaf is in (.*)/, function(expected_labels_) {
      var leafs = this.tree.getLeafs();
      var expected_labels = JSON.parse(expected_labels_);
      expect(expected_labels.length).toBe(leafs.length);
      leafs.forEach(function(leaf) {
        expect(expected_labels.indexOf(leaf.getLabel()) > -1, leaf.getLabel()).toBe(true);
      });
    })
    .then(/every leaf recursively is a SODDTree-object/, function() {
      (function recursionCheckLeafs(tree) {
        var leafs = tree.getLeafs();
        if (leafs.length > 0) {
          leafs.forEach(function(leaf) {
            expect(leaf instanceof SODDTree).toBe(true);
            recursionCheckLeafs(leaf);
          });
        }
      })(this.tree);
    })
    .when(/setting a label (.*)/, function(param) {
      this.tree.setLabel(param);
    });
})();
