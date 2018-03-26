function TrelloList(list_dict) {
  TrelloBoardedObject.call(this, list_dict);
  this.cards = new Array();
};

TrelloList.prototype = Object.create(TrelloBoardedObject.prototype, {
  update: {
    value: function(object_dict) {
      TrelloBoardedObject.prototype.update.call(this, object_dict);
      this.update_cards(this.cards);
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  get_create_post_payload: {
    value: function() {
      var payload = TrelloBoardedObject.prototype.get_create_post_payload.call(this);
      payload["pos"] = "bottom";
      return payload;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  update_cards: {
    value: function(cards) {
      this.cards = cards;
      for(var i in this.cards) {
        this.cards[i].list_id = this.id;
        this.cards[i].board_id = this.board_id;
      }
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  append_card: {
    value: function(card) {
      card.list_id = this.id;
      card.board_id = this.board_id;
      card.update_labels();
      this.cards.push(card);
      return card;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  get_card: {
    value: function(card_id) {
      var card = null;
      for(var i in this.cards) {
        if(this.cards[i].id == card_id) {
          card = this.cards[i];
        };
      };
      return card;
    },
    enumerable: true,
    configurable: false,
    writable: false
  },
  _cards: {
    value: null,
    enumerable: true,
    configurable: true,
    writable: true
  },
  cards: {
    enumerable: true,
    configurable: true,
    set: function(cards) {
      if(cards.length == this._cards.length) {
        for(var i=0; i<cards.length && !this._dirty; i++) {
          for(var j=0; j<this._cards.length && !this._dirty; j++) {
            if(!cards[i].same_as(this._cards[j])) {
              this._dirty = true;
            };
          };
        };
      } else {
        this._dirty = true;
      };
      if(this._dirty) {
        this._cards = cards;
      };
    },
    get: function() {
      return this._cards;
    }
  },
});
TrelloList.prototype.constructor = TrelloList;