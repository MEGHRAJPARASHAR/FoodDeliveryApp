**testing everything in Postman/Thunder Client:**

### Shop tests:(completed)
```
POST   /api/shop/create        → create shop (owner token) //clear
GET    /api/shop/all           → get all shops  //clear
GET    /api/shop/:id           → get one shop //clear
PUT    /api/shop/:id           → update shop (owner token)  //clear
DELETE /api/shop/:id           → delete shop (owner token) //clear
```

### Item tests:(completed)
```
POST   /api/item/:shopId/create-item  → create item (owner token) //clear
GET    /api/item/all                  → get all items //clear
GET    /api/item/:id                  → get one item // using items id //clear
PUT    /api/item/:id                  → update item (owner token)  //clear
DELETE /api/item/:id                  → delete item (owner token) //clear
```
### Now lets start building cart model ,controller and its routes

