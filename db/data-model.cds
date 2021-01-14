namespace my.bookshop;

using {
    Currency,
    managed,
    cuid
} from '@sap/cds/common';

entity Books : managed {
  key ID : Integer;
  title  : String;
  stock  : Integer;
  price : Decimal(9,2);
  currency : Currency;
  author : Association to Authors;
}

entity Authors : managed {
    key ID : Integer;
    name : String(60);
    books : Association to many Books on books.author = $self;
}

entity Orders : cuid, managed {
    OrderNo : String;
    total : Decimal (9, 2) @readonly;
    currency : Currency;
    Items : Composition of many OrderItems on Items.parent = $self
}

entity OrderItems : cuid {
    parent : Association to Orders;
    book : Association to Books;
    amount : Integer;
    netAmount : Decimal(9,2)
}
