using my.bookshop as my from '../db/data-model';

service CatalogService {
    @readyonly entity Books as SELECT from my.Books {
        *,
        author.name as author
    } excluding {createdBy, modifiedBy, createdAt, updatedBy};

    @requires_: 'authenticated-user'
    @insertonly entity Orders as projection on my.Orders;
}