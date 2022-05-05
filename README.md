# 3-digit-zip-lookup
API to look up the lat/long of a 3-digit zip code.  Also supports 4 and 5 digits, as well.
Keeps a moderately sized in-memory cache to optimize lookup speed, as well

Routes are GET:  /US and /MX

ex.
/US?postalCode=55106
/MX?postalCode=00810

## Sample return data
{
    "country":"US",
    "postalCode":"55106",
    "lat":44.963547,
    "lon":-93.049522,
    "items":[{"postalCode":"55106","lat":"44.963547","lng":"-93.049522"}],
    "cached":"false
}

ex.
/US?postalCode=551

{
    "country":"US",
    "postalCode":"551",
    "lat":44.94760753125,
    "lon":-93.10116018750003,
    "items":[
        {"postalCode":"55101","lat":"44.951483","lng":"-93.090649"},
        {"postalCode":"55102","lat":"44.931901","lng":"-93.121291"},
        {"postalCode":"55103","lat":"44.964258","lng":"-93.122627"},
        {"postalCode":"55104","lat":"44.953894","lng":"-93.164446"},
        {"postalCode":"55105","lat":"44.937180","lng":"-93.168279"},
        {"postalCode":"55106","lat":"44.963547","lng":"-93.049522"},
        {"postalCode":"55107","lat":"44.931070","lng":"-93.079172"},
        {"postalCode":"55108","lat":"44.982482","lng":"-93.174880"},
        {"postalCode":"55109","lat":"45.014551","lng":"-93.025535"},
        {"postalCode":"55110","lat":"45.089912","lng":"-93.005988"},
        {"postalCode":"55111","lat":"44.878385","lng":"-93.196359"},
        {"postalCode":"55112","lat":"45.081866","lng":"-93.190493"},
        {"postalCode":"55113","lat":"45.012196","lng":"-93.151186"},
        {"postalCode":"55114","lat":"44.966690","lng":"-93.195072"},
        {"postalCode":"55115","lat":"45.067903","lng":"-92.953441"},
        {"postalCode":"55116","lat":"44.910719","lng":"-93.169581"},
        {"postalCode":"55117","lat":"45.003562","lng":"-93.091280"},
        {"postalCode":"55118","lat":"44.894315","lng":"-93.100947"},
        {"postalCode":"55119","lat":"44.937421","lng":"-93.007402"},
        {"postalCode":"55120","lat":"44.874984","lng":"-93.152093"},
        {"postalCode":"55121","lat":"44.846541","lng":"-93.154935"},
        {"postalCode":"55122","lat":"44.806810","lng":"-93.201497"},
        {"postalCode":"55123","lat":"44.808933","lng":"-93.138449"},
        {"postalCode":"55124","lat":"44.739462","lng":"-93.193842"},
        {"postalCode":"55125","lat":"44.918031","lng":"-92.938277"},
        {"postalCode":"55126","lat":"45.084450","lng":"-93.132817"},
        {"postalCode":"55127","lat":"45.083907","lng":"-93.080233"},
        {"postalCode":"55128","lat":"44.987546","lng":"-92.963553"},
        {"postalCode":"55129","lat":"44.883474","lng":"-92.892768"},
        {"postalCode":"55130","lat":"44.973302","lng":"-93.082410"},
        {"postalCode":"55150","lat":"44.886640","lng":"-93.165422"},
        {"postalCode":"55155","lat":"44.956026","lng":"-93.082680"}],
    "cached":"false"}
    
    ##Warning
    Passing a lat/long that is not necessarily associated with a valid geographic space will likely cause issues with 3rd party providers that expect valid lat/longs
