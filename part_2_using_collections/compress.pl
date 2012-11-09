#!/usr/bin/perl
use HTML::Parse;
print parse_htmlfile($ARGV[0])->as_HTML;
