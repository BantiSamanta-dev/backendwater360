import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/users.m.js'; // Import your User model

passport.use(
  new GoogleStrategy(
    {
      clientID: '1019976092064-c21ghgsgmvo7hu43dv3lc198kkbb9tsb.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'https://localhost:8001/auth/google/callback', // Update with your actual callback URL
    },
    async ( profile, done) => {
      try {
        
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
           
          });
          await user.save();
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export default passport;
