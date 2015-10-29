/**
 * Main entry point of the application.
 */
define(function(require) {
  // Some info to help you get started:
  // Include dependencies by requiring them below using their global names (in
  //  the form "developer.application/file_path_without_.js") and assigning
  //  them to local names that can be anything you like (e.g., $ for jQuery).
  // The dependencies will be mapped to the specific versions that have been
  //  added to the workspace of this application/library (so you need to
  //  remember to actually add them to the workspace as well).
  var $ = require("org.openapplication.jquery/jquery");
  var bootstrap = require("org.openapplication.bootstrap/bootstrap");
  var openapp = require("org.openapplication.openapp/openapp");
  var Graph = require("org.openapplication.openapp/openapp/graph");
  var dom = require("org.openapplication.openapp/dom");
  
  // Begin writing JavaScript here!
  var mixerCreateButton, mixerAddButton, mixerList, mixerMixList, mixerMixButtonHandler;
  var matcherCreateButton, matcherAddButton, matcherList, matcherMixList, matcherMixButtonHandler, matcherRequiresItemHandler, matcherProvidesItemHandler;
  var optimizerCreateButton, optimizerAddButton, optimizerList, optimizerMixList, optimizerMixButtonHandler;
  var browserGroupCreateButton, browserGroupList, browserGroupButtonHandler, browserList;
  var authorLabelInput, authorCommentInput, authorUriInput;
  var viewerIframe;
  var discusserList, discusserLabelInput, discusserCommentInput;
  var chatNameInput, chatMessageInput, chatPostButton, chatList;
  var searchAddPredicateList, searchNewPredicateButton, searchAddPredicateButtonHandler, searchPredicateItemHandler, searchObjectItemHandler;
  var authorAddPredicateList, authorNewPredicateButton, authorAddPredicateButtonHandler, authorPredicateItemHandler, authorObjectItemHandler;
  dom(
    /*['div', {'class':'panel panel-default'},
      ['div', {'class':'panel-heading'},
        'Hello'
      ],
      ['div', {'class':'panel-body'},
        ['p', 'Time: ', function() { return new Date().toISOString(); }],
        ['p', 'Time: ', function() { return new Date().toString(); }],
        ['p', 'List:'],
        ['ol', list = dom.list(function(index) {
          return e('li', 'Item #' + index);
        })]
      ]
    ],*/
    ['ul', {'class':'nav nav-tabs', 'style':'margin-bottom: 1em'},
      ['li', {'role':'presentation', 'class':'active'}, ['a', {'href':'#mixer', 'aria-controls':'mixer', 'role':'tab', 'data-toggle':'tab'}, 'Mix']],
      ['li', {'role':'presentation'}, ['a', {'href':'#matcher', 'aria-controls':'matcher', 'role':'tab', 'data-toggle':'tab'}, 'Match']],
      ['li', {'role':'presentation'}, ['a', {'href':'#optimizer', 'aria-controls':'optimizer', 'role':'tab', 'data-toggle':'tab'}, 'Optimize']]
    ],
    ['div', {'class':'tab-content'},
      ['div', {'role':'tabpanel', 'class':'tab-pane active', 'id':'mixer'},
        ['div', {'class':'panel panel-success'},
          ['div', {'class':'panel-heading'},
            'Mixer'
          ],
          ['div', {'class':'panel-body'},
            ['p',
              dom(['a', {'href':openapp.context().uri, 'class':'btn btn-default', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Show my applied items'},
                ['i', {'class':'fa fa-check-circle'}], ' Applied items'
              ]),
              ' ',
              mixerMixList = dom.list({
                render: function(item) {
                  return this.button = dom(['a', {'href':item.uri, 'class':'btn btn-default active', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Show items of this mix'},
                    'Mix: ', item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                  ]);
                },
                onNode: function() {
                  mixerMixButtonHandler.apply(this, arguments);
                  $(this.button.node).tooltip()
                }
              }),
              ' ',
              mixerCreateButton = dom(['button', {'type':'button', 'class':'btn btn-success', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Create a new mix'},
                ['i', {'class':'fa fa-asterisk'}], ' New mix'
              ])
            ],
            ['hr'],
            ['ul', {'class':'media-list'}, mixerList = dom.list({
              render: function(item) {
                return this.link = dom(['li', {'class':'media', 'href':item.uri},
                  ['div', {'class':'media-left'},
                    dom(['a', {'href':item.uri},
                      ['img', {'class':'media-object', 'src':'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEyLjk1ODMzMzk2OTExNjIxMSIgeT0iMzIiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj42NHg2NDwvdGV4dD48L2c+PC9zdmc+'}]
                    ])
                  ],
                  ['div', {'class':'media-body'},
                    ['h4', {'class':'media-heading'},
                      item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                    ],
                    ['p', item.graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal()],
                    ['p',
                      dom(['button', {'type':'button', 'class':'btn btn-success', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Apply this item to my mix'},
                        ['i', {'class':'fa fa-check'}], ' Apply item'
                      ]),
                      ' ',
                      dom(['button', {'type':'button', 'class':'btn btn-default'},
                        'Actions ', ['span', {'class':'caret'}]
                      ])
                    ]
                  ]
                ]);
              },
              onNode: function() {
                mixerItemLinkHandler.apply(this, arguments);
              }
            })],
            ['hr'],
            ['p',
              mixerAddButton = dom(['button', {'type':'button', 'class':'btn btn-success', 'style':''},
                ['i', {'class':'fa fa-plus'}], ' Add to this mix'
              ]),
              ' ',
              dom(['button', {'type':'button', 'class':'btn btn-success', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Apply all items to my mix'},
                ['i', {'class':'fa fa-check'}], ' Apply all items'
              ]),
              ' ',
              dom(['button', {'type':'button', 'class':'btn btn-default'},
                'Actions ', ['span', {'class':'caret'}]
              ])
            ]
          ]
        ]
      ],
      ['div', {'role':'tabpanel', 'class':'tab-pane', 'id':'matcher'},
        ['div', {'class':'panel panel-success'},
          ['div', {'class':'panel-heading'},
            'Matcher'
          ],
          ['div', {'class':'panel-body'},
            ['p',
              ['span', matcherMixList = dom.list({
                render: function(item) {
                  return this.button = dom(['a', {'href':item.uri, 'class':'btn btn-default active'},
                    'Match: ', item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                  ]);
                },
                onNode: function() {
                  matcherMixButtonHandler.apply(this, arguments);
                }
              })],
              ' ',
              matcherCreateButton = dom(['button', {'type':'button', 'class':'btn btn-success'},
                ['i', {'class':'fa fa-asterisk'}], ' New match'
              ])
            ],
            ['hr'],
            ['ul', {'class':'media-list'}, matcherList = dom.list({
              render: function(item) {
                var subject = item;
                return this.link = dom(['li', {'class':'media', 'href':item.uri},
                  ['div', {'class':'media-left'},
                    dom(['a', {'href':item.uri},
                      ['img', {'class':'media-object', 'src':'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEyLjk1ODMzMzk2OTExNjIxMSIgeT0iMzIiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj42NHg2NDwvdGV4dD48L2c+PC9zdmc+'}]
                    ])
                  ],
                  ['div', {'class':'media-body'},
                    ['h4', {'class':'media-heading'},
                      item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                    ],
                    ['p', item.graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal()],
                    this.requiresList = dom.list({
                      render: function(item) {
                        return ['p',
                          ['i', {'class':'fa fa-arrow-right'}],
                          ' ',
                          ['a', {'href':item.requirement, 'style':'text-transform: capitalize'}, item.requirement.substring(item.requirement.lastIndexOf('/') + 1)],
                          ' ',
                          ['a', {'href':item.object, 'style':'text-transform: capitalize'}, item.object.substring(item.object.lastIndexOf('/') + 1)],
                          ['ul', this.targetList = dom.list({
                            render: function(item) {
                              return ['li',
                                'from ',
                                ['a', {'href':item.uri}, item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()]
                              ];
                            }, onNode: function(item) {
                            }
                          })]
                        ];
                      },
                      onNode: function(item) {
                        matcherRequiresItemHandler.call(this, subject, item);
                      }
                    }),
                    this.providesList = dom.list({
                      render: function(item) {
                        return ['p',
                          ['i', {'class':'fa fa-arrow-left'}],
                          ' ',
                          ['a', {'href':item.provision, 'style':'text-transform: capitalize'}, item.provision.substring(item.provision.lastIndexOf('/') + 1)],
                          ' ',
                          ['a', {'href':item.object, 'style':'text-transform: capitalize'}, item.object.substring(item.object.lastIndexOf('/') + 1)],
                          ['ul', this.targetList = dom.list({
                            render: function(item) {
                              return ['li',
                                'to ',
                                ['a', {'href':item.uri}, item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()]
                              ];
                            }, onNode: function(item) {
                            }
                          })]
                        ];
                      },
                      onNode: function(item) {
                        matcherProvidesItemHandler.call(this, subject, item);
                      }
                    }),
                    ['p', {'style':'display: none'},
                      dom(['button', {'type':'button', 'class':'btn btn-success', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Apply this item to my mix'},
                        ['i', {'class':'fa fa-check'}], ' Apply item'
                      ]),
                      ' ',
                      dom(['button', {'type':'button', 'class':'btn btn-default'},
                        'Actions ', ['span', {'class':'caret'}]
                      ])
                    ]
                  ]
                ]);
              },
              onNode: function() {
                matcherItemLinkHandler.apply(this, arguments);
              }
            })],
            ['p', {'style':'display: none'},
              matcherAddButton = dom(['button', {'type':'button', 'class':'btn btn-success', 'style':''},
                ['i', {'class':'fa fa-plus'}], ' Add to this mix'
              ])
            ]
          ]
        ]
      ],
      ['div', {'role':'tabpanel', 'class':'tab-pane', 'id':'optimizer'},
        ['div', {'class':'panel panel-success'},
          ['div', {'class':'panel-heading'},
            'Optimizer'
          ],
          ['div', {'class':'panel-body'},
            ['p',
              ['span', optimizerMixList = dom.list({
                render: function(item) {
                  return this.button = dom(['a', {'href':item.uri, 'class':'btn btn-default active'},
                    'Optimize: ',
                    item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                  ]);
                },
                onNode: function() {
                  optimizerMixButtonHandler.apply(this, arguments);
                }
              })],
              ' ',
              optimizerCreateButton = dom(['button', {'type':'button', 'class':'btn btn-success'},
                ['i', {'class':'fa fa-asterisk'}], ' New optimize'
              ])
            ],
            ['hr'],
            ['ul', {'class':'media-list'}, optimizerList = dom.list({
              render: function(item) {
                return this.link = dom(['li', {'class':'media', 'href':item.uri},
                  ['div', {'class':'media-left'},
                    dom(['a', {'href':item.uri},
                      ['img', {'class':'media-object', 'src':'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEyLjk1ODMzMzk2OTExNjIxMSIgeT0iMzIiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj42NHg2NDwvdGV4dD48L2c+PC9zdmc+'}]
                    ])
                  ],
                  ['div', {'class':'media-body'},
                    ['h4', {'class':'media-heading'},
                      item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                    ],
                    ['p',
                      item.graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal(),
                      ['div', {'style':'color: green; font-weight: bold'},
                        "+1"
                      ]
                    ]
                  ]
                ]);
              },
              onNode: function() {
                optimizerItemLinkHandler.apply(this, arguments);
              }
            })],
            ['hr'],
            ['p',
              ['span', {'style':'color: green; font-weight: bold'}, '+1: '], '3', ' ',
              ['span', {'style':'color: gray; font-weight: bold'}, '+0: '], '0', ' ',
              ['span', {'style':'color: red; font-weight: bold'}, '−0: '], '0'
            ],
            ['p', {'style':'display: none'},
              optimizerAddButton = dom(['button', {'type':'button', 'class':'btn btn-success', 'style':''},
                ['i', {'class':'fa fa-plus'}], ' Add to this mix'
              ])
            ]
          ]
        ]
      ]
    ],
    ['div', {'class':'panel panel-info'},
      ['div', {'class':'panel-heading'},
        'Search'
      ],
      ['div', {'class':'panel-body'},
        ['div',
          searchPredicateList = dom.list({
            render: function(item) {
              var predicate = item;
              return dom(['p',
                ['div', {'class':'input-group', 'data-toggle':'buttons'},
                  ['span', {'class':'input-group-button'},
                    ['a', {'type':'button', 'href':item.uri, 'class':'btn btn-primary dropdown-toggle', 'data-toggle':'dropdown', 'aria-expanded':'false'},
                      item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal(),
                      ' ', ['span', {'class':'caret'}]
                    ],
                    ['ul', {'class':'dropdown-menu','role':'menu'},
                      ['li', this.removeLink = dom(['a', {'href':'#'}, 'Remove predicate'])],
                      ['li', this.newLink = dom(['a', {'href':'#'}, 'New object'])]
                    ]
                  ],
                  this.objectList = dom.list({
                    render: function(item) {
                      return ['a', {'class':'btn btn-default', 'href':item.uri},
                        this.checkbox = dom(['input', {'type':'checkbox', 'autocomplete':'off'}]),
                        item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                      ];
                    },
                    onNode: function(item) {
                      searchObjectItemHandler.call(this, predicate, item);
                    }
                  })
                ]
              ]);
            }, onNode: function() {
              searchPredicateItemHandler.apply(this, arguments);
            }
          })
        ],
        ['p',
          ['div', {'class':'input-group', 'data-toggle':'buttons'},
            ['span', {'class':'input-group-button'},
              ['button', {'type':'button','class':'btn btn-primary dropdown-toggle','data-toggle':'dropdown','aria-expanded':'false'},
                'Add predicate ', ['span', {'class':'caret'}]
              ],
              ['ul', {'class':'dropdown-menu','role':'menu'},
                searchAddPredicateList = dom.list({
                  render: function(item) {
                    return ['li', this.link = dom(['a', {'href':item.uri},
                      item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()])
                    ];
                  },
                  onNode: function() {
                    searchAddPredicateButtonHandler.apply(this, arguments);
                  }
                }),
                ['li', searchNewPredicateButton = dom(['a', {'href':'#'}, 'New predicate'])]
              ]
            ]
          ]
        ]
      ]
    ],
    ['div', {'class':'panel panel-info'},
      ['div', {'class':'panel-heading'},
        'Browse'
      ],
      ['div', {'class':'panel-body'},
        ['p',
          dom(['a', {'href':openapp.context().uri, 'class':'btn btn-default', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Show my applied items'},
            ['i', {'class':'fa fa-user'}], ' Local'
          ]),
          ' ',
          ['span', browserGroupList = dom.list({
            render: function(item) {
              return this.button = dom(['a', {'href':item.uri, 'class':'btn btn-default active'},
                'Group: ', item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
              ]);
            },
            onNode: function() {
              browserGroupButtonHandler.apply(this, arguments);
            }
          })],
          ' ',
          browserGroupCreateButton = dom(['button', {'type':'button', 'class':'btn btn-primary'},
            ['i', {'class':'fa fa-asterisk'}], ' New group'
          ]),
        ],
        ['hr'],
        ['ul', {'class':'media-list'}, browserList = dom.list(function(item) {
          return ['li', {'class':'media'},
            ['div', {'class':'media-left'},
              ['a', {'href':item.uri},
                ['img', {'class':'media-object', 'src':'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEyLjk1ODMzMzk2OTExNjIxMSIgeT0iMzIiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj42NHg2NDwvdGV4dD48L2c+PC9zdmc+'}]
              ]
            ],
            ['div', {'class':'media-body'},
              ['h4', {'class':'media-heading'},
                item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
              ],
              ['p', item.graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal()],
              ['p',
                dom(['button', {'type':'button', 'class':'btn btn-primary', 'data-toggle':'tooltip', 'data-placement':'bottom', 'title':'Apply this item to my mix'},
                  ['i', {'class':'fa fa-check'}], ' Apply item'
                ]),
                ' ',
                dom(['button', {'type':'button', 'class':'btn btn-default'},
                  'Actions ', ['span', {'class':'caret'}]
                ])
              ]
            ]
          ];
        })],
        ['hr'],
        ['p',
          browserAddButton = dom(['button', {'type':'button', 'class':'btn btn-primary'},
            ['i', {'class':'fa fa-plus'}], ' Add to this group'
          ])
        ]
      ]
    ],
    ['div', {'class':'panel panel-info'},
      ['div', {'class':'panel-heading'},
        'Author'
      ],
      ['div', {'class':'panel-body'},
        ['form',
          ['div', {'class':'form-group'},
            ['label', {'for':'authorLabelInput'}, 'Label'],
            authorLabelInput = dom(['input', {'type':'input', 'class':'form-control', 'id':'authorLabelInput', 'placeholder':'Label'}])
          ],
          ['div', {'class':'form-group'},
            ['label', {'for':'authorCommentInput'}, 'Comment'],
            authorCommentInput = dom(['input', {'type':'input', 'class':'form-control', 'id':'authorCommentInput', 'placeholder':'Comment'}])
          ],
          ['div', {'class':'form-group'},
            ['label', {'for':'authorUriInput'}, 'URI'],
            authorUriInput = dom(['input', {'type':'input', 'class':'form-control', 'id':'authorUriInput', 'placeholder':'http://'}])
          ],
          ['div',
            authorPredicateList = dom.list({
              render: function(item) {
                var predicate = item;
                return dom(['p',
                  ['div', {'class':'input-group', 'data-toggle':'buttons'},
                    ['span', {'class':'input-group-button'},
                      ['a', {'type':'button', 'href':item.uri, 'class':'btn btn-primary dropdown-toggle', 'data-toggle':'dropdown', 'aria-expanded':'false'},
                        item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal(),
                        ' ', ['span', {'class':'caret'}]
                      ],
                      ['ul', {'class':'dropdown-menu','role':'menu'},
                        ['li', this.removeLink = dom(['a', {'href':'#'}, 'Remove predicate'])],
                        ['li', this.newLink = dom(['a', {'href':'#'}, 'New object'])]
                      ]
                    ],
                    this.objectList = dom.list({
                      render: function(item) {
                        return ['a', {'class':'btn btn-default', 'href':item.uri},
                          this.checkbox = dom(['input', {'type':'checkbox', 'autocomplete':'off'}]),
                          item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
                        ];
                      },
                      onNode: function(item) {
                        authorObjectItemHandler.call(this, predicate, item);
                      }
                    })
                  ]
                ]);
              }, onNode: function() {
                authorPredicateItemHandler.apply(this, arguments);
              }
            })
          ],
          ['p',
            ['div', {'class':'input-group', 'data-toggle':'buttons'},
              ['span', {'class':'input-group-button'},
                ['button', {'type':'button','class':'btn btn-primary dropdown-toggle','data-toggle':'dropdown','aria-expanded':'false'},
                  'Add predicate ', ['span', {'class':'caret'}]
                ],
                ['ul', {'class':'dropdown-menu','role':'menu'},
                  authorAddPredicateList = dom.list({
                    render: function(item) {
                      return ['li', this.link = dom(['a', {'href':item.uri},
                        item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()])
                      ];
                    },
                    onNode: function() {
                      authorAddPredicateButtonHandler.apply(this, arguments);
                    }
                  }),
                  ['li', authorNewPredicateButton = dom(['a', {'href':'#'}, 'New predicate'])]
                ]
              ]
            ]
          ]                 
        ]
      ]
    ],
    ['div', {'class':'panel panel-info'},
      ['div', {'class':'panel-heading'},
        'View'
      ],
      ['div', {'class':'panel-body'},
        viewerIframe = dom(['iframe', {'style':'width: 100%; height: 500px; border: 0px; display: none;'}])
      ]
    ],
    ['div', {'class':'panel panel-info'},
      ['div', {'class':'panel-heading'},
        'Discuss'
      ],
      ['div', {'class':'panel-body'},
        ['p', 'Select something to discuss!'],
        ['ul', {'class':'media-list'}, discusserList = dom.list(function(item) {
          return ['li', {'class':'media'},
            ['div', {'class':'media-left'},
              ['a', {'href':item.uri},
                ['img', {'class':'media-object', 'src':'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+PGRlZnMvPjxyZWN0IHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjEyLjk1ODMzMzk2OTExNjIxMSIgeT0iMzIiIHN0eWxlPSJmaWxsOiNBQUFBQUE7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBPcGVuIFNhbnMsIHNhbnMtc2VyaWYsIG1vbm9zcGFjZTtmb250LXNpemU6MTBwdDtkb21pbmFudC1iYXNlbGluZTpjZW50cmFsIj42NHg2NDwvdGV4dD48L2c+PC9zdmc+'}]
              ]
            ],
            ['div', {'class':'media-body'},
              ['h4', {'class':'media-heading'},
                item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal()
              ],
              item.graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal()
            ]
          ];
        })],
        ['form',
          ['div', {'class':'form-group'},
            ['label', {'for':'discusserLabelInput'}, 'Label'],
            discusserLabelInput = dom(['input', {'type':'input', 'class':'form-control', 'id':'discusserLabelInput', 'placeholder':'Label'}])
          ],
          ['div', {'class':'form-group'},
            ['label', {'for':'discusserCommentInput'}, 'Comment'],
            discusserCommentInput = dom(['input', {'type':'input', 'class':'form-control', 'id':'discusserCommentInput', 'placeholder':'Comment'}])
          ],
          ['div', {'class':'form-group'},
            discusserAddButton = dom(['button', {'type':'submit', 'class':'btn btn-primary'}, 'Post']),
          ]
        ]
      ]
    ],
    ['div', {'class':'panel panel-info'},
      ['div', {'class':'panel-heading'},
        'Chat'
      ],
      ['div', {'class':'panel-body'},
        ['p', 'Chat with anyone on this page!'],
        ['hr'],
        ['div', chatList = dom.list(function(item) {
          return ['p',
            ['strong',
              item.graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal(),
              ': '
            ],
            item.graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal()
          ];
        })],
        ['form',
          ['div', {'class':'form-group'},
            ['label', {'for':'chatNameInput'}, 'Name'],
            chatNameInput = dom(['input', {'type':'input', 'class':'form-control', 'id':'chatNameInput', 'placeholder':'Name'}])
          ],
          ['div', {'class':'form-group'},
            ['label', {'for':'chatMessageInput'}, 'Message'],
            chatMessageInput = dom(['input', {'type':'input', 'class':'form-control', 'id':'chatMessageInput', 'placeholder':'Message'}])
          ],
          ['div', {'class':'form-group'},
            chatPostButton = dom(['button', {'type':'submit', 'class':'btn btn-primary'}, 'Post']),
          ]
        ]
      ]
    ]
  ).apply();
  
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });
  
  var mixerMixListener = openapp.context().list("http://purl.org/tellme/mix", mixerMixList);
  var mixerResource = null; //openapp.context();
  var mixerListener = null; //mixerResource.list(mixerList);
  
  $(mixerCreateButton.node).on('click', function() {
    var label = prompt("What should the mixer be called?");
    if (label == null) {
      return;
    }
    if (mixerListener !== null) {
      mixerListener.close();
    }
    mixerList.clear();
    openapp.context().post("http://purl.org/tellme/mix", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify({
      "@id": "_:new",
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": label || "New mix"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": "This is the new mix " + new Date()
        }
      }
    })).done(function(result) {
      mixerResource = result.resource();
      mixerListener = mixerResource.list(mixerList);
    });
  });
  $(mixerAddButton.node).on('click', function() {
    if (mixerResource === null) {
      alert("Create or select a mixer first!");
    }
    var body = {
      "@id": "_:new",
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": $(authorLabelInput.node).val() || "Label"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": $(authorCommentInput.node).val() || "Comment"
        }
      }
    };
    for (var authorProperty in authorProperties) {
      if (authorProperties.hasOwnProperty(authorProperty)) {
        var authorObjects = authorProperties[authorProperty];
        body[authorProperty] = [];
        for (var authorObject in authorObjects) {
          if (authorObjects.hasOwnProperty(authorObject)) {
            var checked = authorObjects[authorObject];
            if (checked === true) {
              body[authorProperty].push({
                "@id": authorObject
              });
            }
          }
        }
      }
    }
    var uri = $(authorUriInput.node).val();
    if (uri !== "") {
      body['http://purl.org/openapp/external'] = { '@id': uri };
    }
    mixerResource.post("http://purl.org/tellme/mix", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify(body)).done(function(result) {
      var resource = result.resource();
      console.log(resource);
    });
  });
  mixerMixButtonHandler = function(item) {
    $(this.button.node).on('click', function(event) {
      event.preventDefault();
      if (mixerListener !== null) {
        mixerListener.close();
      }
      mixerList.clear();
      mixerResource = item.resource;
      mixerListener = mixerResource.list(mixerList);
    });
  };
  mixerItemLinkHandler = function(item) {
    $(this.link.node).on('click', function(event) {
      event.preventDefault();
      if (discusserListener !== null) {
        discusserListener.close();
      }
      discusserList.clear();
      discusserResource = item.resource;
      discusserListener = discusserResource.list(discusserList);
      var uri = item.info.property("http://purl.org/openapp/external").uri();
      if (typeof uri === "string") {
        $(viewerIframe.node).attr("src", uri);
        $(viewerIframe.node).css("display", "block");
      } else {
        $(viewerIframe.node).attr("src", "about:blank");
        $(viewerIframe.node).css("display", "none");
      }
    });
  };
  
  var matcherMixListener = openapp.context().list("http://purl.org/tellme/matcher", matcherMixList);
  var matcherResource = null; //openapp.context();
  var matcherListener = null; //matcherResource.list(matcherList);
  var matcherRequiresUri = undefined;
  var matcherProvidesUri = undefined;
  var matcherRequiresLists = {}, matcherProvidesLists = {};
  
  $(matcherCreateButton.node).on('click', function() {
    var label = prompt("What should the matcher be called?");
    if (label == null) {
      return;
    }
    var requiresUri = prompt("What is the URI of the predicate specifying a requirement/input?");
    if (requiresUri == null) {
      return;
    }
    var providesUri = prompt("What is the URI of the predicate specifying a provision/output?");
    if (providesUri == null) {
      return;
    }
    matcherRequiresUri = requiresUri;
    matcherProvidesUri = providesUri;
    matcherRequiresLists = {};
    matcherProvidesLists = {};
    if (matcherListener !== null) {
      matcherListener.close();
    }
    matcherList.clear();
    openapp.context().post("http://purl.org/tellme/matcher", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify({
      "@id": "_:new",
      "http://purl.org/tellme/requirement": { "@id": requiresUri },
      "http://purl.org/tellme/provision": { "@id": providesUri },
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": label || "New matcher"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": "This is the new matcher " + new Date()
        }
      }
    })).done(function(result) {
      matcherResource = result.resource();
      matcherListener = mixerResource.list(matcherList);
    });
  });
  $(matcherAddButton.node).on('click', function() {
    if (matcherResource === null) {
      alert("Create or select a mixer first!");
    }
    var body = {
      "@id": "_:new",
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": $(authorLabelInput.node).val() || "Label"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": $(authorCommentInput.node).val() || "Comment"
        }
      }
    };
    var uri = $(authorUriInput.node).val();
    if (uri !== "") {
      body['http://purl.org/openapp/external'] = { '@id': uri };
    }
    matcherResource.post("http://purl.org/tellme/mix", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify(body)).done(function(result) {
      var resource = result.resource();
      console.log(resource);
    });
  });
  matcherMixButtonHandler = function(item) {
    $(this.button.node).on('click', function(event) {
      event.preventDefault();
      if (matcherListener !== null) {
        matcherListener.close();
      }
      matcherList.clear();
      matcherResource = item.resource;
      matcherRequiresUri = item.info.property("http://purl.org/tellme/requirement").uri();
      matcherProvidesUri = item.info.property("http://purl.org/tellme/provision").uri();
      matcherRequiresLists = {};
      matcherProvidesLists = {};
      matcherListener = mixerResource.list(matcherList);
    });
  };
  matcherItemLinkHandler = function(item) {
    var requires, provides, i;
    if (typeof matcherRequiresUri !== "undefined") {
      requires = item.info.property(matcherRequiresUri).uris();
    }
    if (typeof matcherProvidesUri !== "undefined") {
      provides = item.info.property(matcherProvidesUri).uris();
    }
    if (!Array.isArray(requires)) {
      requires = [];
    }
    if (!Array.isArray(provides)) {
      provides = [];
    }
    for (i = 0; i < requires.length; i++) {
      this.requiresList.push({ requirement: matcherRequiresUri, provision: matcherProvidesUri, object: requires[i] });
    }
    for (i = 0; i < provides.length; i++) {
      this.providesList.push({ requirement: matcherRequiresUri, provision: matcherProvidesUri, object: provides[i] });
    }
    $(this.link.node).on('click', function(event) {
      event.preventDefault();
      if (discusserListener !== null) {
        discusserListener.close();
      }
      discusserList.clear();
      discusserResource = item.resource;
      discusserListener = discusserResource.list(discusserList);
      var uri = item.info.property("http://purl.org/openapp/external").uri();
      if (typeof uri === "string") {
        $(viewerIframe.node).attr("src", uri);
        $(viewerIframe.node).css("display", "block");
      } else {
        $(viewerIframe.node).attr("src", "about:blank");
        $(viewerIframe.node).css("display", "none");
      }
    });
  };
  matcherRequiresItemHandler = function(subject, item) {
    var requirement = item.requirement;
    var provision = item.provision;
    var object = item.object;
    var targets = this.targetList;
    var requiresPredicateLists = matcherRequiresLists[requirement];
    if (typeof requiresPredicateLists === "undefined") {
      matcherRequiresLists[requirement] = requiresPredicateLists = {};
    }
    var requiresObjectLists = requiresPredicateLists[object];
    if (typeof requiresObjectLists === "undefined") {
      requiresPredicateLists[object] = requiresObjectLists = [];
    }
    requiresObjectLists.push({ subject: subject, targets: targets });
    var providesPredicateLists = matcherProvidesLists[provision];
    if (typeof providesPredicateLists !== "undefined") {
      var providesObjectLists = providesPredicateLists[object];
      if (typeof providesObjectLists !== "undefined") {
        for (var i = 0; i < providesObjectLists.length; i++) {
          var providesList = providesObjectLists[i];
          providesList.targets.push(subject);
          targets.push(providesList.subject);
        }
      }
    }
  };
  matcherProvidesItemHandler = function(subject, item) {
    var requirement = item.requirement;
    var provision = item.provision;
    var object = item.object;
    var targets = this.targetList;
    var providesPredicateLists = matcherProvidesLists[provision];
    if (typeof providesPredicateLists === "undefined") {
      matcherProvidesLists[provision] = providesPredicateLists = {};
    }
    var providesObjectLists = providesPredicateLists[object];
    if (typeof providesObjectLists === "undefined") {
      providesPredicateLists[object] = providesObjectLists = [];
    }
    providesObjectLists.push({ subject: subject, targets: targets });
    var requiresPredicateLists = matcherRequiresLists[requirement];
    if (typeof requiresPredicateLists !== "undefined") {
      var requiresObjectLists = requiresPredicateLists[object];
      if (typeof requiresObjectLists !== "undefined") {
        for (var i = 0; i < requiresObjectLists.length; i++) {
          var requiresList = requiresObjectLists[i];
          requiresList.targets.push(subject);
          targets.push(requiresList.subject);
        }
      }
    }
  };
  
  var optimizerMixListener = openapp.context().list("http://purl.org/tellme/optimizer", optimizerMixList);
  var optimizerResource = null; //openapp.context();
  var optimizerListener = null; //optimizerResource.list(optimizerList);
  
  $(optimizerCreateButton.node).on('click', function() {
    var label = prompt("What should the optimizer be called?");
    if (label == null) {
      return;
    }
    var predicateUri = prompt("What is the URI of the predicate of the statement to be optimized against?");
    if (predicateUri == null) {
      return;
    }
    var objectUri = prompt("What is the URI of the object of the statement to be optimized against?");
    if (objectUri == null) {
      return;
    }
    if (optimizerListener !== null) {
      optimizerListener.close();
    }
    optimizerList.clear();
    openapp.context().post("http://purl.org/tellme/optimizer", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify({
      "@id": "_:new",
      "http://purl.org/tellme/predicate": { "@id": predicateUri },
      "http://purl.org/tellme/object": { "@id": objectUri },
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": label || "New optimize"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": "This is the new optimize " + new Date()
        }
      }
    })).done(function(result) {
      optimizerResource = result.resource();
      optimizerListener = mixerResource.list(optimizerList);
    });
  });
  $(optimizerAddButton.node).on('click', function() {
    if (optimizerResource === null) {
      alert("Create or select a mix first!");
    }
    var body = {
      "@id": "_:new",
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": $(authorLabelInput.node).val() || "Label"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": $(authorCommentInput.node).val() || "Comment"
        }
      }
    };
    var uri = $(authorUriInput.node).val();
    if (uri !== "") {
      body['http://purl.org/openapp/external'] = { '@id': uri };
    }
    optimizerResource.post("http://purl.org/tellme/mix", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify(body)).done(function(result) {
      var resource = result.resource();
      console.log(resource);
    });
  });
  optimizerMixButtonHandler = function(item) {
    $(this.button.node).on('click', function(event) {
      event.preventDefault();
      if (optimizerListener !== null) {
        optimizerListener.close();
      }
      optimizerList.clear();
      optimizerResource = item.resource;
      optimizerListener = mixerResource.list(optimizerList);
    });
  };
  optimizerItemLinkHandler = function(item) {
    $(this.link.node).on('click', function(event) {
      event.preventDefault();
      if (discusserListener !== null) {
        discusserListener.close();
      }
      discusserList.clear();
      discusserResource = item.resource;
      discusserListener = discusserResource.list(discusserList);
      var uri = item.info.property("http://purl.org/openapp/external").uri();
      if (typeof uri === "string") {
        $(viewerIframe.node).attr("src", uri);
        $(viewerIframe.node).css("display", "block");
      } else {
        $(viewerIframe.node).attr("src", "about:blank");
        $(viewerIframe.node).css("display", "none");
      }
    });
  };
  
  var searchPredicateListener = openapp.context().list("http://purl.org/tellme/predicate", searchAddPredicateList);
  var searchProperties = {};
  
  $(searchNewPredicateButton.node).on('click', function() {
    var label = prompt("What should the predicate be called?");
    if (label === null) {
      return;
    }
    var uri = prompt("What is the URI to be used for the predicate?");
    if (uri === null) {
      return;
    }
    var body = {
      "@id": "_:new",
      "http://purl.org/openapp/external": { "@id": uri },
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": label || "Predicate"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": "This is a predicate " + new Date()
        }
      }
    };
    openapp.context().post("http://purl.org/tellme/predicate", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify(body)).done(function(result) {
      //mixerResource = result.resource();
      //mixerListener = mixerResource.list(mixerList);
    });
  });
  searchAddPredicateButtonHandler = function(item) {
    var predicate = item.info.property("http://purl.org/openapp/external").uri();
    $(this.link.node).on('click', function(event) {
      event.preventDefault();
      if (searchProperties.hasOwnProperty(predicate)) {
        alert("This predicate has already been added.");
        return;
      }
      searchPredicateList.push(item);
      searchProperties[predicate] = {};
    });
  };
  searchPredicateItemHandler = function(item) {
    var objectListener = item.resource.list("http://purl.org/tellme/object", this.objectList);
    var predicate = item.info.property("http://purl.org/openapp/external").uri();
    $(this.removeLink.node).on('click', function(event) {
      event.preventDefault();
      objectListener.close();
      searchPredicateList.remove(item);
      delete searchProperties[predicate];
    });
    $(this.newLink.node).on('click', function(event) {
      event.preventDefault();
      var label = prompt("What should the object be called?");
      if (label === null) {
        return;
      }
      var uri = prompt("What is the URI to be used for the object?");
      if (uri === null) {
        return;
      }
      var body = {
        "@id": "_:new",
        "http://purl.org/openapp/external": { "@id": uri },
        "@graph": {
          "@id": "_:new",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "@value": label || "Object"
          },
          "http://www.w3.org/2000/01/rdf-schema#comment": {
            "@value": "This is an object " + new Date()
          }
        }
      };
      item.resource.post("http://purl.org/tellme/object", {
        "Content-Type": "application/ld+json"
      }, JSON.stringify(body)).done(function(result) {
        //mixerResource = result.resource();
        //mixerListener = mixerResource.list(mixerList);
      });
    });
  };
  searchObjectItemHandler = function(predicateItem, objectItem) {
    $(this.checkbox.node).on('change', function(event) {
      event.preventDefault();
      var checked = $(this).is(':checked');
      var predicate = predicateItem.info.property("http://purl.org/openapp/external").uri();
      var object = objectItem.info.property("http://purl.org/openapp/external").uri();
      var objects = searchProperties[predicate];
      objects[object] = checked;
    });
  };
  
  var browserGroupListener = openapp.context().list("http://purl.org/tellme/group", browserGroupList);
  var browserResource = null;
  var browserListener = null;
  
  $(browserGroupCreateButton.node).on('click', function() {
    var label = prompt("What should the group be called?");
    if (label === null) {
      return;
    }
    if (browserListener !== null) {
      browserListener.close();
    }
    browserList.clear();
    openapp.context().post("http://purl.org/tellme/group", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify({
      "@id": "_:new",
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": label || "New group"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": "This is the new group " + new Date()
        }
      }
    })).done(function(result) {
      browserResource = result.resource();
      browserListener = browserResource.list(browserList);
    });
  });
  $(browserAddButton.node).on('click', function() {
    if (browserResource === null) {
      alert("Create or select a group first!");
    }
    var body = {
      "@id": "_:new",
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": $(authorLabelInput.node).val() || "Label"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": $(authorCommentInput.node).val() || "Comment"
        }
      }
    };
    for (var authorProperty in authorProperties) {
      if (authorProperties.hasOwnProperty(authorProperty)) {
        var authorObjects = authorProperties[authorProperty];
        body[authorProperty] = [];
        for (var authorObject in authorObjects) {
          if (authorObjects.hasOwnProperty(authorObject)) {
            var checked = authorObjects[authorObject];
            if (checked === true) {
              body[authorProperty].push({
                "@id": authorObject
              });
            }
          }
        }
      }
    }
    var uri = $(authorUriInput.node).val();
    if (uri !== "") {
      body['http://purl.org/openapp/external'] = { '@id': uri };
    }
    browserResource.post("http://purl.org/tellme/mix", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify(body)).done(function(result) {
      var resource = result.resource();
      console.log(resource);
    });
  });
  browserGroupButtonHandler = function(item) {
    $(this.button.node).on('click', function(event) {
      event.preventDefault();
      if (browserListener !== null) {
        browserListener.close();
      }
      browserList.clear();
      browserResource = item.resource;
      var filter = {};
      for (var searchProperty in searchProperties) {
        if (searchProperties.hasOwnProperty(searchProperty)) {
          var searchObjects = searchProperties[searchProperty];
          filter[searchProperty] = [];
          for (var searchObject in searchObjects) {
            if (searchObjects.hasOwnProperty(searchObject)) {
              var checked = searchObjects[searchObject];
              if (checked === true) {
                filter[searchProperty].push({
                  "@id": searchObject
                });
              }
            }
          }
        }
      }
      browserListener = browserResource.list(filter, browserList);
    });
  };
  
  var authorPredicateListener = openapp.context().list("http://purl.org/tellme/predicate", authorAddPredicateList);
  var authorProperties = {};
  
  $(authorNewPredicateButton.node).on('click', function() {
    var label = prompt("What should the predicate be called?");
    if (label === null) {
      return;
    }
    var uri = prompt("What is the URI to be used for the predicate?");
    if (uri === null) {
      return;
    }
    var body = {
      "@id": "_:new",
      "http://purl.org/openapp/external": { "@id": uri },
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": label || "Predicate"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": "This is a predicate " + new Date()
        }
      }
    };
    openapp.context().post("http://purl.org/tellme/predicate", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify(body)).done(function(result) {
      //mixerResource = result.resource();
      //mixerListener = mixerResource.list(mixerList);
    });
  });
  authorAddPredicateButtonHandler = function(item) {
    var predicate = item.info.property("http://purl.org/openapp/external").uri();
    $(this.link.node).on('click', function(event) {
      event.preventDefault();
      if (authorProperties.hasOwnProperty(predicate)) {
        alert("This predicate has already been added.");
        return;
      }
      authorPredicateList.push(item);
      authorProperties[predicate] = {};
    });
  };
  authorPredicateItemHandler = function(item) {
    var objectListener = item.resource.list("http://purl.org/tellme/object", this.objectList);
    var predicate = item.info.property("http://purl.org/openapp/external").uri();
    $(this.removeLink.node).on('click', function(event) {
      event.preventDefault();
      objectListener.close();
      authorPredicateList.remove(item);
      delete authorProperties[predicate];
    });
    $(this.newLink.node).on('click', function(event) {
      event.preventDefault();
      var label = prompt("What should the object be called?");
      if (label === null) {
        return;
      }
      var uri = prompt("What is the URI to be used for the object?");
      if (uri === null) {
        return;
      }
      var body = {
        "@id": "_:new",
        "http://purl.org/openapp/external": { "@id": uri },
        "@graph": {
          "@id": "_:new",
          "http://www.w3.org/2000/01/rdf-schema#label": {
            "@value": label || "Object"
          },
          "http://www.w3.org/2000/01/rdf-schema#comment": {
            "@value": "This is an object " + new Date()
          }
        }
      };
      item.resource.post("http://purl.org/tellme/object", {
        "Content-Type": "application/ld+json"
      }, JSON.stringify(body)).done(function(result) {
        //mixerResource = result.resource();
        //mixerListener = mixerResource.list(mixerList);
      });
    });
  };
  authorObjectItemHandler = function(predicateItem, objectItem) {
    $(this.checkbox.node).on('change', function(event) {
      event.preventDefault();
      var checked = $(this).is(':checked');
      var predicate = predicateItem.info.property("http://purl.org/openapp/external").uri();
      var object = objectItem.info.property("http://purl.org/openapp/external").uri();
      var objects = authorProperties[predicate];
      objects[object] = checked;
    });
  };
  
  var discusserGroupListener = openapp.context().list("http://purl.org/tellme/discussion", discusserList);
  var discusserResource = null;
  var discusserListener = null;
  
  $(discusserAddButton.node).on('click', function(event) {
    event.preventDefault();
    if (discusserResource === null) {
      alert("Select something to discuss first!");
    }
    discusserResource.post("http://purl.org/tellme/discussion", {
      "Content-Type": "application/ld+json"
    }, JSON.stringify({
      "@id": "_:new",
      "@graph": {
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": {
          "@value": $(discusserLabelInput.node).val() || "Label"
        },
        "http://www.w3.org/2000/01/rdf-schema#comment": {
          "@value": $(discusserCommentInput.node).val() || "Comment"
        }
      }
    })).done(function(result) {
      var resource = result.resource();
      console.log(resource);
    });
  });
  
  var chatResource = openapp.context();
  chatResource.log(chatList);
  
  /*chatResource.listen(function(info) {
    if (this.type === "message") {
      info.graph(function(graph) {
        chatList.push({ uri: info.context.uri, resource: info.context, info: info, graph: graph });
      });
    }
  });*/
  /*.on("http://purl.org/tellme/chat", function(data) {
    var graph = new Graph([data]);
    chatList.push({ graph: graph });
  });*/
  
  $(chatPostButton.node).on('click', function(event) {
    event.preventDefault();
    chatResource.emit("http://purl.org/tellme/chat", {
      "@id": "_:new",
      "@graph": [{
        "@id": "_:new",
        "http://www.w3.org/2000/01/rdf-schema#label": [{
          "@value": $(chatNameInput.node).val() || "Name"
        }],
        "http://www.w3.org/2000/01/rdf-schema#comment": [{
          "@value": $(chatMessageInput.node).val() || "Message"
        }]
      }]
    });    
  });

  //list.push(1);
  //list.post(2);
  //list.push(3);
  
  //mixList.push({ label: "Epson BT-200", comment: "Smart glasses with Android" });
  //mixList.push({ label: "ARgh!", comment: "Augmented reality for activities" });
  
  //openapp.context().info().done(function(info) {});

  /*openapp.context().iterate(function(info) {
    info.graph(function(graph) {
      mixList.push({
        label: graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal(),
        comment: graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal()
      });
    });
  });
  openapp.context().listen(function(info) {
    if (this.type !== "add")
      return;
    info.graph(function(graph) {
      mixList.post({
        label: graph.property("http://www.w3.org/2000/01/rdf-schema#label").literal(),
        comment: graph.property("http://www.w3.org/2000/01/rdf-schema#comment").literal()
      });
    });
  });*/
  
});