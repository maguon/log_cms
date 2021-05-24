const express = require('express')
const apiRouter = express.Router({mergeParams:true});
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './public/uploads' });
import {ContentController,AdminController,UserController,MenuController, MenuTreeController, NewsController,SysLogController,ImageController,StyleController,LayoutController} from '../controller'



apiRouter.get('/content', ContentController.getContent);
apiRouter.post('/content', ContentController.createContent);
apiRouter.put('/content/:contentId', ContentController.updateContent);
apiRouter.delete('/content/:contentId', ContentController.removeContent);

apiRouter.get('/admin/:adminId', AdminController.getAdmin);
apiRouter.post('/adminLogin' ,AdminController.adminLogin);
apiRouter.post('/admin' ,AdminController.createAdmin);

apiRouter.get('/user', UserController.getUser);
apiRouter.get('/user/:userId', UserController.getUserBase);
apiRouter.post('/user', UserController.createUser);
apiRouter.post('/userLogin' ,UserController.userLogin);
apiRouter.put('/user/:userId', UserController.updateUser);
apiRouter.put('/user/:userId/password', UserController.changeUserPassword);
apiRouter.put('/user/:userId/status/:status', UserController.updateUserStatus);

apiRouter.get('/menu', MenuController.getMenu);
apiRouter.post('/menu', MenuController.createMenu);
apiRouter.put('/menu/:menuId', MenuController.updateMenu);
apiRouter.put('/menu/:menuId/image', MenuController.updateMenuImage);
apiRouter.delete('/menu/:menuId', MenuController.removeMenu);

apiRouter.get('/news', NewsController.getNews);
apiRouter.post('/menu/:menuId/news', NewsController.createNews);
apiRouter.put('/news/:newsId', NewsController.updateNews);
apiRouter.put('/news/:newsId/image', NewsController.updateNewsImage);
apiRouter.delete('/news/:newsId', NewsController.removeNews);

apiRouter.get('/sysLog', SysLogController.getSysLog);
apiRouter.delete('/sysLogBatch', SysLogController.removeSysLog);
apiRouter.delete('/sysLogAll', SysLogController.removeSysLogAll);

apiRouter.post('/user/:userId/image',multipartMiddleware, ImageController.uploadImage);
apiRouter.get('/image/:imageId', ImageController.getImage);
apiRouter.delete('/image/:imageId', ImageController.deleteImage);

apiRouter.post('/user/:userId/favicon',multipartMiddleware, ImageController.uploadFavicon);
apiRouter.post('/user/:userId/logo',multipartMiddleware, ImageController.uploadLogo);
apiRouter.post('/user/:userId/banner',multipartMiddleware, ImageController.uploadBanner);

apiRouter.get('/style', StyleController.getStyle);
apiRouter.post('/sid/:sid/style', StyleController.createStyle);

apiRouter.get('/layout', LayoutController.getLayout);
apiRouter.post('/layout', LayoutController.createLayout);

apiRouter.get('/menuTree', MenuTreeController.getMenuTree);
apiRouter.post('/menuTree', MenuTreeController.createMenuTree);

module.exports = apiRouter