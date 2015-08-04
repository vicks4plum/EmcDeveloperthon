using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EmcChargeback.Startup))]
namespace EmcChargeback
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
