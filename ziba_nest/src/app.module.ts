import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './controllers/login.controller';
import { LoginService } from './services/login.service';
import { DatabaseService } from './services/db.service';
import { ClientController } from './controllers/client.controller';
import { ClientService } from './services/client.service';
@Module({
  imports: [JwtModule.register({
    secret:
      'hjfdsalhfdsahfjkdsakreaurceukfbukalsfyuej43243545y47988367+++fdsfjhdsifyhujdshfjkdsahfjkdskgfhjdsgfygsuyejkgfhdjgfsgejfgdjhsdgfhjsekfyhdbsyfjegfjdysgfjyefgydegfhjseyrfeyr63254342343',
    signOptions: { expiresIn: '1h' },
  }),],
  
  controllers: [AppController,LoginController,ClientController],
  providers: [AppService,LoginService,DatabaseService,ClientService],
})
export class AppModule {}
