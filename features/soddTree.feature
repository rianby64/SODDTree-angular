
Feature: SODDTree
  In order to operate with trees I supouse to setup a simple tree called
  Simple Ordered Drag And Drop Tree which
  lets me to manipulate a tree
  order it by some reason
  and perform drag and drop so it can swap leafs between each other.

Scenario: construct an empty SODDTree-object 
  Given a data = undefined for tree
  And a config = undefined for tree
  When calling the constructor
  Then tree is a SODDTree object
  And the tree's Leafs is []
  When setting a label my label
  Then tree's label is my label
  And the tree has some id

Scenario: construct a SODDTree-object and check its root
  Given a data = {"prop1":"property1","prop2":"property2","text":"my label"} for tree
  And a config = {"label":"text"} for tree
  When calling the constructor
  Then tree is a SODDTree object
  And tree's label is my label
  And tree's property prop1 is property1

Scenario: construct a SODDTree-object with an Array of leafs and check leafs
  Given a data = {"prop1":"property1","leafs":[{"text":"somelabel"},{"text":"otherlabel"}]} for tree
  And a config = {"label":"text"} for tree
  When calling the constructor
  Then tree is a SODDTree object
  And tree's leafs is an Array where every item is SODDTree
  And every tree's label's leaf is in ["somelabel","otherlabel"]

Scenario: construct a SODDTree-object with one Object as a leafs and check leafs
  Given a data = {"prop1":"property1","leafs":{"text":"somelabel"}} for tree
  And a config = {"label":"text"} for tree
  When calling the constructor
  Then tree is a SODDTree object
  And tree's leafs is an Array where every item is SODDTree
  And every tree's label's leaf is in ["somelabel"]

Scenario: construct a SODDTree-object with some recursions
  Given a data = {"label":"l_1","leafs":[{"label":"l_1_1","leafs":{"label":"l_1_1_1"}},{"label":"l_1_2"}]} for tree
  When calling the constructor
  Then every leaf recursively is a SODDTree-object

Scenario: By using a custom leaf property construct a SODDTree-object with an Array of leafs and check leafs
  Given a data = {"prop1":"property1","child":[{"text":"somelabel"},{"text":"otherlabel"}]} for tree
  And a config = {"label":"text","leafs":"child"} for tree
  When calling the constructor
  Then tree is a SODDTree object
  And tree's leafs is an Array where every item is SODDTree
  And every tree's label's leaf is in ["somelabel","otherlabel"]

Scenario: By using a custom leaf property construct a SODDTree-object with one Object as a leafs and check leafs
  Given a data = {"prop1":"property1","child":{"text":"somelabel"}} for tree
  And a config = {"label":"text", "leafs":"child"} for tree
  When calling the constructor
  Then tree is a SODDTree object
  And tree's leafs is an Array where every item is SODDTree
  And every tree's label's leaf is in ["somelabel"]

Scenario: By using a custom leaf property construct a SODDTree-object with some recursions
  Given a data = {"label":"l_1","child":[{"label":"l_1_1","child":{"label":"l_1_1_1"}},{"label":"l_1_2"}]} for tree
  And a config = {"leafs":"child"} for tree
  When calling the constructor
  Then every leaf recursively is a SODDTree-object

Scenario: SODDTree-object and CRUD leafs with all their actions
  Given a data = {"text":"l_1"} for tree
  And a config = {"label":"text"} for tree
  When calling the constructor
  And adding a leaf {"text":"l_1_1"}
  And adding a leaf {"text":"l_1_2"}
  And adding a leaf {"text":"l_1_3"}
  And adding a leaf {"text":"l_1_4","someprop":"some value"}
  And adding a leaf {"text":"l_1_5","otherprop":"other value"}
  And adding a leaf {"text":"l_1_6"}
  Then every leaf recursively is a SODDTree-object
  And every tree's label's leaf is in ["l_1_1","l_1_3","l_1_2","l_1_4","l_1_5","l_1_6"]
  When removing a leaf "l_1_1" by text
  And removing a leaf {"text": "l_1_3"} by text
  And removing a leaf "some value" by someprop
  And search a leaf by otherprop with value "other value"
  And removing the found leaf
  Then every tree's label's leaf is in ["l_1_2","l_1_6"]

Scenario: leafs inside one SODDTree-object can be arranged by "myprop"
  Given a data = {"label":"l_1"} for tree
  And a config = {"leafs":"child"} for tree
  When calling the constructor
  And adding a leaf {"myprop":"l_1_1"}
  And adding a leaf {"myprop":"l_1_3"}
  And adding a leaf {"myprop":"l_1_5"}
  And adding a leaf {"myprop":"l_1_4"}
  And adding a leaf {"myprop":"l_1_2"}
  And sorting by myprop
  Then every leaf recursively is a SODDTree-object
  And leafs are shorted by myprop



