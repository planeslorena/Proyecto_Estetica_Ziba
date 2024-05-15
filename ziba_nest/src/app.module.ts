import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { DatabaseService } from './services/db.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
@Module({
  imports: [JwtModule.register({
    secret:
      'hjfdsalhfdsahfjkdsakreaurceukfbukalsfyuej43243545y47988367+++fdsfjhdsifyhujdshfjkdsahfjkdskgfhjdsgfygsuyejkgfhdjgfsgejfgdjhsdgfhjsekfyhdbsyfjegfjdysgfjyefgydegfhjseyrfeyr63254342343',
    signOptions: { expiresIn: '1h' },
  }),],
  
  controllers: [AppController,LoginController,UserController],
  providers: [AppService,LoginService,DatabaseService,UserService],
})
export class AppModule {}
