function PageTrackingObj(exp, titleName, cm, frame){
   this.VarTrivPageTracking = new Variable( 'VarTrivPageTracking', null, 0, cm, frame, exp, titleName, true );
   this.numPages = 0;
   this.publishTimeStamp = 0;
   this.title = null;
}

PageTrackingObj.prototype.InitPageTracking = function ( )
{
	var THIS = this;
	var pageTrackData = this.VarTrivPageTracking.getValue();
	var bDoInit = true;
	try {
	    if (pageTrackData && pageTrackData.length > 0 && pageTrackData != '~~~null~~~')
	    {
	        var topLevelSplit = pageTrackData.split('#');
	        if (topLevelSplit && topLevelSplit.length > 1)
            {
		        var arrIds = topLevelSplit[0].split(',');
		        var arrStatus = topLevelSplit[1].split('');
		        var bits = 4;
		        for( var i=0; i<arrIds.length; i++ )
		        {
			        var id = parseInt( '0x' + arrIds[i] );
			        var mask = 1<<(i%bits);
			        var status = ( parseInt('0x'+arrStatus[Math.floor(i/bits)] ) & mask ) == 0 ? 1 : 2;
			        var node = this.FindNode( this.title, id );
			        if( node )
				        node.v = status;
		        }
    		}
        }
    } catch (e) { }
}

PageTrackingObj.prototype.FindNode = function( node, id )
{
	if( node.id == id )
		return node;
	
	var match = null;
	if( typeof( node.c ) != 'undefined' ){
		for( var i=0; i<node.c.length; i++ ){
			match = this.FindNode( node.c[i], id );
			if( match != null )
				break;
		}
	}
	
	return match;
}

PageTrackingObj.prototype.InternalGetRangeStatus = function( node )
{
	if( node == null )
		return -1;
		
	if( typeof(node.c) == 'undefined' )
	{
		return node.v;
	}
	else
	{
		// we need to calculate
		if( node.v == 0 )
		{
			var bAllComplete = true;
			var bInprogress = false;
			for( var i=0; i<node.c.length; i++ )
			{
				var cnode = node.c[i];
				var status = this.InternalGetRangeStatus( cnode );
				if( status == 1 || status == 2 )
					bInprogress = true;
				if( status == 0 || status == 1)
					bAllComplete = false;
			}
			
			if( !node.t && bAllComplete )
				return 2;
			else if( bInprogress )
				return 1;
			else
				return 0;
		}
		else
			return node.v
			
	}
}

//returns a incomplete or inprogress or complete
PageTrackingObj.prototype.GetRangeStatus = function( id, bInit )
{
	var status = -1;
	if ( bInit ) 
		this.InitPageTracking();
	
	status = this.InternalGetRangeStatus( this.FindNode( this.title, id ) );
		
	if( status == 0)
		return 'notstarted';	
	else if( status == 1 )
		return 'inprogress';
		
	return 'complete';
}


PageTrackingObj.prototype.InternalSetRangeStatus=function( node, status )
{
	if( node == null )
		return;
	node.v = status;
	if( status == 0 && typeof(node.c)!='undefined')
	{
		for( var i=0; i<node.c.length; i++ )
			this.InternalSetRangeStatus( node.c[i], status ); 
	}
}

PageTrackingObj.prototype.SetRangeStatus = function( id, status /*0 or 1 or 2*/)
{
	this.InternalSetRangeStatus( this.FindNode(this.title, id), status );
	
	this.SavePageTracking();
}

PageTrackingObj.prototype.IterateTree = function( func )
{
	var stack = [];
	stack.push( this.title );
	var i = 0;
	while( stack.length > 0 )
	{
		var node = stack.shift();
		
		if( typeof(node.c) != 'undefined' )
			stack = node.c.concat(stack);
			
		//do the thing
		func( node, i, stack );
		i++;
	}	
}

PageTrackingObj.prototype.SavePageTracking = function()
{
	var hexVal = 0;
	var hexString = '';
	
	var arrayIds = [];
	var arrayStatus= [];
	
	this.IterateTree( function(node, i, stack){
		if( node.v != 0 )
		{
			arrayIds.push(node.id);
			arrayStatus.push(node.v);
		}
	});
	
	for( var i=0; i<arrayIds.length; i++ )
	{
		if( i!=0 ) hexString += ',';
		hexString += arrayIds[i].toString(16);
	}
	
	hexString += '#';
	
	var bits = 4;
	var num = 0;
	for( var i=0; i<arrayStatus.length; i++ )
	{
		var bit = arrayStatus[i] == 2 ? 1 : 0
		num |= bit << (i%bits);
		if( ((i+1)%bits==0) || ((i+1)==arrayStatus.length) )
		{
			hexString += num.toString(16);
			num = 0;
		}
	}
	
	this.VarTrivPageTracking.set(hexString);
}

PageTrackingObj.prototype.GetNumCompPages = function(childArray, countCompleted)
{
	//Pass in title.c to get all completed pages
	for(var idx = 0; idx < childArray.length; idx++ )
	{
		if(childArray[idx].c)
			countCompleted = this.GetNumCompPages(childArray[idx].c, countCompleted);
		else if( typeof(childArray[idx].c) == 'undefined')
		{
			var strStatus ='';
			strStatus = this.GetRangeStatus(childArray[idx].id);
			if (strStatus === 'complete')
				countCompleted++;
		}
	}
	return countCompleted;
}

var trivPageTracking = new PageTrackingObj(365,'mr_accessible_template_2023_l19_v1.1', 0, null);
trivPageTracking.numPages = 72;

trivPageTracking.publishTimeStamp = 20231231223055;

trivPageTracking.title={id:1,v:0,c:[{id:13935,v:0,c:[{id:1767010,v:0},{id:875540,v:0},{id:875572,v:0},{id:892827,v:0},{id:1788297,v:0},{id:796246,v:0},{id:18800,v:0,c:[{id:810,v:0},{id:826893,v:0},{id:829102,v:0},{id:833137,v:0},{id:833579,v:0},{id:1369556,v:0},{id:832915,v:0},{id:1899453,v:0},{id:1858230,v:0},{id:1858938,v:0},{id:751824,v:0},{id:1864493,v:0},{id:1861537,v:0},{id:1063803,v:0},{id:1906756,v:0},{id:1908040,v:0},{id:1855956,v:0},{id:750162,v:0},{id:1856484,v:0},{id:1103003,v:0},{id:1102937,v:0},{id:1985898,v:0},{id:732381,v:0},{id:1129231,v:0},{id:922418,v:0},{id:1918686,v:0},{id:922476,v:0},{id:1918772,v:0},{id:922598,v:0},{id:922642,v:0},{id:1918222,v:0},{id:1918091,v:0},{id:1917897,v:0},{id:1503699,v:0},{id:1503637,v:0},{id:861234,v:0},{id:859075,v:0},{id:864542,v:0},{id:863440,v:0},{id:857207,v:0},{id:850159,v:0},{id:1915472,v:0},{id:1915407,v:0},{id:1915342,v:0},{id:1915277,v:0},{id:1915212,v:0},{id:1915147,v:0},{id:1915086,v:0},{id:1915028,v:0},{id:2044057,v:0}]},{id:1739815,v:0,c:[{id:1739922,v:0}]},{id:1741615,v:0,c:[{id:1741631,v:0}]},{id:1741698,v:0,c:[{id:1741714,v:0}]},{id:1741781,v:0,c:[{id:1741797,v:0}]},{id:1742470,v:0,c:[{id:1742486,v:0}]},{id:1743873,v:0,c:[{id:1743889,v:0}]},{id:1018092,v:0,t:1,c:[{id:1018093,v:0,c:[{id:1018094,v:0}]},{id:1018111,v:0,c:[{id:1993558,v:0}]},{id:1021480,v:0,c:[{id:1993661,v:0}]},{id:1022677,v:0},{id:1022404,v:0,c:[{id:1066268,v:0}]},{id:1023883,v:0,c:[{id:1066559,v:0},{id:1370767,v:0}]},{id:1018261,v:0}]},{id:1224504,v:0,c:[{id:1018268,v:0}]},{id:1006362,v:0,c:[{id:980530,v:0},{id:1203595,v:0}]}]}]};
